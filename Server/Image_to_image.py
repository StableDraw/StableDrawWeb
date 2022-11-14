import os
import PIL
from PIL import Image
import torch
import numpy as np
from omegaconf import OmegaConf
from tqdm import tqdm, trange
from itertools import islice
from einops import rearrange, repeat
from torchvision.utils import make_grid
from torch import autocast
from contextlib import nullcontext
from pytorch_lightning import seed_everything
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler

checkpoint_path = 'models/ldm/stable-diffusion-v1/'
checkpoint_list = ["sd-v1-1.ckpt", 
                   "sd-v1-1-full-ema.ckpt", 
                   "sd-v1-2.ckpt", 
                   "sd-v1-2-full-ema.ckpt", 
                   "sd-v1-3.ckpt", 
                   "sd-v1-3-full-ema.ckpt", 
                   "sd-v1-4.ckpt", 
                   "sd-v1-4-full-ema.ckpt", 
                   "sd-v1-5.ckpt", 
                   "sd-v1-5-full-ema.ckpt"]

if not os.path.exists(checkpoint_path):
    os.mkdir(checkpoint_path)
    import urllib.request
    import click
    print("сначала нужно посетить каждую страницу снизу и согласиться с лицензионными соглашениями:")
    for i in range (1, 5):
        print("https://huggingface.co/CompVis/stable-diffusion-v-1-" + str(i) + "-original/resolve/main/")
    print("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/")
    click.pause()
    for i in range (1, 5):
        urllib.request.urlretrieve("https://huggingface.co/CompVis/stable-diffusion-v-1-1-original/resolve/main/sd-v1-" + str(i) + ".ckpt", checkpoint_path + checkpoint_list[2 * (i - 1)])
        urllib.request.urlretrieve("https://huggingface.co/CompVis/stable-diffusion-v-1-1-original/resolve/main/sd-v1-" + str(i) + "-full-ema.ckpt", checkpoint_path + checkpoint_list[2 * (i - 1) + 1])
    urllib.request.urlretrieve("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt", checkpoint_path + checkpoint_list[4])
    urllib.request.urlretrieve("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned.ckpt", checkpoint_path + checkpoint_list[4])

async def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

async def load_model_from_config(ws, config, ckpt, verbose=False):
    #print(f"Загрузка модели из {ckpt}")
    #await ws.send(json.dumps({'0' : "t", '1' : "Загрузка модели"}))
    pl_sd = torch.load(ckpt, map_location="cpu")
    if "global_step" in pl_sd:
        #await ws.send(json.dumps({'0' : "t", '1' : "Глобальный шаг: {pl_sd['global_step']}"}))
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
    max_dim = pow(512, 2) # я не могу генерировать на своей видюхе картинки больше 512 на 512
    cur_dim = w * h
    if cur_dim > max_dim:
        k = cur_dim / max_dim
        sk = float(k**(0.5))
        w = int(w / sk)
        h = int(h / sk)

    #print(f"загруженно изображение размера ({w}, {h})")
    w, h = map(lambda x: x - x % 64, (w, h))  # resize to integer multiple of 64
    image = image.resize((w, h), resample=PIL.Image.LANCZOS)
    image = np.array(image).astype(np.float32) / 255.0
    image = image[None].transpose(0, 3, 1, 2)
    image = torch.from_numpy(image)
    return 2.*image - 1.

async def Stable_diffusion(ws, work_path, AI_prompt):
    opt = {
        'style': "4k photorealistic", #стиль изображения для рентеринга
        'ddim_steps': 50,             #количество шагов выборки ddim
        'ddim_eta': 0.0,              #ddim η (η=0.0 соответствует детерминированной выборке)
        'n_iter': 1,                  #определяет частоту дискретизации
        'C': 4,                       #латентные каналы
        'f': 8,                       #коэффициент понижающей дискретизации, чаще всего 8 или 16
        'scale': 5.0,                 #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
        'strength': 0.8,              #сила увеличения/уменньшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
        'ckpt': 0,                    #выбор контрольной точки модели (от 0 до 9)
        'seed': 42,                   #сид (для воспроизводимой генерации изображений)
        'precision': "autocast"       #оценивать с этой точностью ("full" или "autocast")
        }
    
    init_img = work_path + "/drawing.png"
    if AI_prompt: 
        pfile = work_path + "/AI_caption.txt"
    else:
        pfile = work_path + "/Human_caption.txt"
    with open(pfile, "r") as f:
        prompt = f.read()
    seed_everything(opt['seed'])

    config = OmegaConf.load("configs/stable-diffusion/v1-inference.yaml") #путь к конфигурационному файлу строения модели
    model = await load_model_from_config(ws, config, "models/ldm/stable-diffusion-v1/" + checkpoint_list[opt["ckpt"]])

    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)

    outpath = work_path
    prompt += " " + opt['style']
    data = [prompt]
    '''
    with Image.open(init_img).convert("RGB") as image:
        orig_w, orig_h = image.size
    await ws.send(json.dumps({'0' : "t", '1' : "Загруженно изображение размера (" + str(orig_w) + "x" + str(orig_h) +")"}))
    '''
    init_image = load_img(init_img).to(device)
    init_image = repeat(init_image, '1 ... -> b ...', b = 1)
    init_latent = model.get_first_stage_encoding(model.encode_first_stage(init_image))  # move to latent space

    sampler.make_schedule(ddim_num_steps=opt['ddim_steps'], ddim_eta=opt['ddim_eta'], verbose=False)

    assert 0. <= opt['strength'] <= 1., 'возможна работа только с силой шума в диапозоне [0.0, 1.0]'
    t_enc = int(opt['strength'] * opt['ddim_steps'])
    #print(f"target t_enc is {t_enc} steps")
    #await ws.send(json.dumps({'0' : "t", '1' : "Целевое декодирование из {t_enc} шагов"}))

    precision_scope = autocast if opt['precision'] == "autocast" else nullcontext
    with torch.no_grad():
        with precision_scope("cuda"):
            with model.ema_scope():
                for n in trange(opt['n_iter'], desc="Sampling"):
                    uc = None
                    if opt['scale'] != 1.0:
                        uc = model.get_learned_conditioning([""])
                    if isinstance(prompt, tuple):
                        prompt = list(prompt)
                    c = model.get_learned_conditioning(prompt)

                    # encode (scaled latent)
                    z_enc = sampler.stochastic_encode(init_latent, torch.tensor([t_enc]).to(device))
                    # decode it
                    samples = sampler.decode(z_enc, c, t_enc, unconditional_guidance_scale=opt['scale'], unconditional_conditioning=uc)

                    x_samples = model.decode_first_stage(samples)
                    x_samples = torch.clamp((x_samples + 1.0) / 2.0, min=0.0, max=1.0)

                    x_sample = x_samples[0]
                    x_sample = 255. * rearrange(x_sample.cpu().numpy(), 'c h w -> h w c')
                    img = Image.fromarray(x_sample.astype(np.uint8))
                    w, h = img.size
                    img.save(outpath + "/AI_picture.png")
                    img.close
                    with open(outpath + "/AI_picture.png", "rb") as image_file:
                        b_data = image_file.read()
    return w, h, b_data