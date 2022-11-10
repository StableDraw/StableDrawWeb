import os
import PIL
import torch
import numpy as np
from omegaconf import OmegaConf
from PIL import Image
from tqdm import tqdm, trange
from itertools import islice
from einops import rearrange, repeat
from torchvision.utils import make_grid
from torch import autocast
from contextlib import nullcontext
from pytorch_lightning import seed_everything
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.models.diffusion.plms import PLMSSampler

def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

def load_model_from_config(config, ckpt, verbose=False):
    print(f"Загрузка модели из {ckpt}")
    pl_sd = torch.load(ckpt, map_location="cpu")
    if "global_step" in pl_sd:
        print(f"Глобальный шаг: {pl_sd['global_step']}")
    sd = pl_sd["state_dict"]
    model = instantiate_from_config(config.model)
    m, u = model.load_state_dict(sd, strict=False)
    if len(m) > 0 and verbose:
        print("Недостающие параметры:")
        print(m)
    if len(u) > 0 and verbose:
        print("Некорректные параметры:")
        print(u)

    model.cuda()
    model.eval()
    return model

def load_img(path):
    image = Image.open(path).convert("RGB")
    w, h = image.size
    print(f"загруженно изображение размера ({w}, {h}) из {path}")
    w, h = map(lambda x: x - x % 32, (w, h))  # resize to integer multiple of 32
    image = image.resize((w, h), resample=PIL.Image.LANCZOS)
    image = np.array(image).astype(np.float32) / 255.0
    image = image[None].transpose(0, 3, 1, 2)
    image = torch.from_numpy(image)
    return 2.*image - 1.

def main():
    opt = {
        'prompt': "rabbit 4k photorealistic", #описание изображения для рендеринга
        'init_img': "input/12.png",           #путь к входному изображению
        'outdir': "outputs/img2img-samples",  #дирректория, в которую выводится результат
        'skip_grid': False,                   #не сохранять сетку, только отдельные изображения. Полезно при оценке большого количества изображений
        'skip_save': False,                   #не сохранять отдельные образцы. Необходимо для измерения скорости
        'ddim_steps': 50,                     #количество шагов выборки ddim
        'plms': False,                        #использовать выборку plms
        'fixed_code': False,                  #если включено, использует один и тот же начальный код для всех образцов
        'ddim_eta': 0.0,                      #ddim η (η=0.0 соответствует детерминированной выборке)
        'n_iter': 1,                          #определяет частоту дискретизации
        'C': 4,                               #латентные каналы
        'f': 8,                               #коэффициент понижающей дискретизации, чаще всего 8 или 16
        'n_samples': 2,                       #сколько изображений производить для каждой заданной подсказки. Также размер батча
        'n_rows': 0,                          #строк в сетке (по умолчанию: n_samples)
        'scale': 5.0,                         #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
        'strength': 0.8,                      #сила увеличения/уменньшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
        'from_file': "",                      #если указано, загружать подсказки из этого файла
        'config': "configs/stable-diffusion/v1-inference.yaml", #путь к конфигерационному файлу строения модели
        'ckpt': "models/ldm/stable-diffusion-v1/sd-v1-1.ckpt", #путь к контрольной точке модели
        'seed': 42,                           #сид (для воспроизводимой генерации изображений)
        'precision': "autocast"               #оценивать с этой точностью ("full" или "autocast")
        }

    seed_everything(opt['seed'])

    config = OmegaConf.load(opt['config'])
    model = load_model_from_config(config, opt['ckpt'])

    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)

    if opt['plms']:
        raise NotImplementedError("Дискретизатор PLMS (пока) не поддерживается")
        sampler = PLMSSampler(model)
    else:
        sampler = DDIMSampler(model)

    os.makedirs(opt['outdir'], exist_ok=True)
    outpath = opt['outdir']

    batch_size = opt['n_samples']
    n_rows = opt['n_rows'] if opt['n_rows'] > 0 else batch_size
    if not opt['from_file']:
        prompt = opt['prompt']
        assert prompt is not None
        data = [batch_size * [prompt]]

    else:
        print(f"чтение описания из " + opt['from_file'])
        with open(opt['from_file'], "r") as f:
            data = f.read().splitlines()
            data = list(chunk(data, batch_size))

    sample_path = os.path.join(outpath, "samples")
    os.makedirs(sample_path, exist_ok=True)
    base_count = len(os.listdir(sample_path))
    grid_count = len(os.listdir(outpath)) - 1

    assert os.path.isfile(opt['init_img'])
    init_image = load_img(opt['init_img']).to(device)
    init_image = repeat(init_image, '1 ... -> b ...', b=batch_size)
    init_latent = model.get_first_stage_encoding(model.encode_first_stage(init_image))  # move to latent space

    sampler.make_schedule(ddim_num_steps=opt['ddim_steps'], ddim_eta=opt['ddim_eta'], verbose=False)

    assert 0. <= opt['strength'] <= 1., 'возможна работа только с силой шума в диапозоне [0.0, 1.0]'
    t_enc = int(opt['strength'] * opt.ddim_steps)
    print(f"target t_enc is {t_enc} steps")

    precision_scope = autocast if opt['precision'] == "autocast" else nullcontext
    with torch.no_grad():
        with precision_scope("cuda"):
            with model.ema_scope():
                all_samples = list()
                for n in trange(opt['n_iter'], desc="Sampling"):
                    for prompts in tqdm(data, desc="data"):
                        uc = None
                        if opt.scale != 1.0:
                            uc = model.get_learned_conditioning(batch_size * [""])
                        if isinstance(prompts, tuple):
                            prompts = list(prompts)
                        c = model.get_learned_conditioning(prompts)

                        # encode (scaled latent)
                        z_enc = sampler.stochastic_encode(init_latent, torch.tensor([t_enc]*batch_size).to(device))
                        # decode it
                        samples = sampler.decode(z_enc, c, t_enc, unconditional_guidance_scale=opt.scale,
                                                 unconditional_conditioning=uc,)

                        x_samples = model.decode_first_stage(samples)
                        x_samples = torch.clamp((x_samples + 1.0) / 2.0, min=0.0, max=1.0)

                        if not opt.skip_save:
                            for x_sample in x_samples:
                                x_sample = 255. * rearrange(x_sample.cpu().numpy(), 'c h w -> h w c')
                                Image.fromarray(x_sample.astype(np.uint8)).save(
                                    os.path.join(sample_path, f"{base_count:05}.png"))
                                base_count += 1
                        all_samples.append(x_samples)

                if not opt.skip_grid:
                    # additionally, save as grid
                    grid = torch.stack(all_samples, 0)
                    grid = rearrange(grid, 'n b c h w -> (n b) c h w')
                    grid = make_grid(grid, nrow=n_rows)

                    # to image
                    grid = 255. * rearrange(grid, 'c h w -> h w c').cpu().numpy()
                    Image.fromarray(grid.astype(np.uint8)).save(os.path.join(outpath, f'grid-{grid_count:04}.png'))
                    grid_count += 1

    print(f"Изображения готовы и находятся в дирректории:\n{outpath}")

if __name__ == "__main__":
    main()
