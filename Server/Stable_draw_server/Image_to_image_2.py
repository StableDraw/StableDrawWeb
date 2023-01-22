import io
import PIL
import torch
import numpy as np
from omegaconf import OmegaConf
from PIL import Image
from tqdm import trange
from itertools import islice
from einops import rearrange, repeat
from torch import autocast
from contextlib import nullcontext
from pytorch_lightning import seed_everything
from imwatermark import WatermarkEncoder
from scripts.txt2img import put_watermark
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler

checkpoint_path = 'models\\ldm\\stable-diffusion-v2\\'
checkpoint_list = ["512-depth-ema.ckpt",
                   "512-base-ema.ckpt",
                   "dpt_hybrid-midas-501f0c75.pt"]

async def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

async def load_model_from_config(ws, config, ckpt, verbose=False):
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
    max_dim = pow(512, 2) + 1 # я не могу генерировать на своей видюхе картинки больше 512 на 512
    cur_dim = w * h
    if cur_dim > max_dim:
        k = cur_dim / max_dim
        sk = float(k**(0.5))
        w = int(w / sk)
        h = int(h / sk)
    print("загружено входное изображение размера ({w}, {h}) из папки {path}")
    w, h = map(lambda x: x - x % 64, (w, h))  # изменение размера в целое число, кратное 64-м
    image = image.resize((w, h), resample = PIL.Image.LANCZOS)
    image = np.array(image).astype(np.float32) / 255.0
    image = image[None].transpose(0, 3, 1, 2)
    image = torch.from_numpy(image)
    return 2. * image - 1.

async def Stable_diffusion_2(ws, work_path, img_name, AI_prompt, opt):
    init_img = work_path + "/" + img_name
    if AI_prompt: 
        pfile = work_path + "/AI_caption.txt"
    else:
        pfile = work_path + "/Human_caption.txt"
    with open(pfile, "r") as f:
        prompt = f.read()
    seed_everything(opt['seed'])
    config = OmegaConf.load("configs/stable-diffusion/v2-inference.yaml")
    model = await load_model_from_config(ws, config, checkpoint_path + checkpoint_list[opt["ckpt"]])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    print("Создания расшифровщика невидимого водяного знака (смотри https://github.com/ShieldMnt/invisible-watermark)...")
    wm = "SDV2"
    wm_encoder = WatermarkEncoder()
    wm_encoder.set_watermark('bytes', wm.encode('utf-8'))
    init_image = load_img(init_img).to(device)
    init_image = repeat(init_image, '1 ... -> b ...', b = 1)
    init_latent = model.get_first_stage_encoding(model.encode_first_stage(init_image))  # move to latent space
    sampler.make_schedule(ddim_num_steps=opt['ddim_steps'], ddim_eta=opt['ddim_eta'], verbose=False)
    assert 0. <= opt['strength'] <= 1., 'can only work with strength in [0.0, 1.0]'
    t_enc = int(opt['strength'] * opt['ddim_steps'])
    print("Целевое декодирование t_enc из {t_enc} шагов")
    precision_scope = autocast if opt['precision'] == "autocast" else nullcontext
    with torch.no_grad():
        with precision_scope("cuda"):
            with model.ema_scope():
                if opt['scale'] != 1.0:
                    uc = model.get_learned_conditioning([""])
                else:
                    uc = None
                c = model.get_learned_conditioning(prompt)
                # закодировать (скрытое масштабирование)
                z_enc = sampler.stochastic_encode(init_latent, torch.tensor([t_enc]).to(device))
                # раскодировать
                samples = sampler.decode(z_enc, c, t_enc, unconditional_guidance_scale = opt['scale'], unconditional_conditioning = uc, )
                x_sample = 255. * rearrange(torch.clamp((model.decode_first_stage(samples) + 1.0) / 2.0, min = 0.0, max = 1.0)[0].cpu().numpy(), 'c h w -> h w c')
                img = Image.fromarray(x_sample.astype(np.uint8))
                img = put_watermark(img, wm_encoder)
                w, h = img.size
                buf = io.BytesIO()
                img.save(buf, format = "PNG")
                b_data = buf.getvalue()
                img.save(work_path + "/picture.png")
                img.close
    return w, h, b_data