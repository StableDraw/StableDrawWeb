import io
import PIL
import torch
import numpy as np
import safetensors.torch
from omegaconf import OmegaConf
from PIL import Image
from itertools import islice
from einops import rearrange, repeat
from torch import autocast
from contextlib import nullcontext
from pytorch_lightning import seed_everything
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler

checkpoint_path = 'models\\ldm\\stable-diffusion\\img2img\\'
checkpoint_list = [
    ["sd-v1-1.ckpt", 0],
    ["sd-v1-1-full-ema.ckpt", 0],
    ["sd-v1-2.ckpt", 0],
    ["sd-v1-2-full-ema.ckpt", 0],
    ["sd-v1-3.ckpt", 0],
    ["sd-v1-3-full-ema.ckpt", 0],
    ["sd-v1-4.ckpt", 0],
    ["sd-v1-4-full-ema.ckpt", 0],
    ["sd-v1-5.ckpt", 0],
    ["sd-v1-5-full-ema.ckpt", 0],
    ["512-base-ema.ckpt", 1],
]
config_path = "configs\\stable-diffusion\\"
config_list = ["v1-inference.yaml", "v2-midas-inference.yaml"]

def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

def load_model_from_config(ws, config, ckpt, verbose = False):
    print(f"Загрузка модели из {ckpt}")
    if ckpt[ckpt.rfind('.'):] == ".safetensors":
        pl_sd = safetensors.torch.load_file(ckpt, device = "cpu")
    else:
        pl_sd = torch.load(ckpt, map_location = "cpu")
    if "global_step" in pl_sd:
        print(f"Глобальный шаг: {pl_sd['global_step']}")
    sd = pl_sd["state_dict"] if "state_dict" in pl_sd else pl_sd
    model = instantiate_from_config(config.model)
    m, u = model.load_state_dict(sd, strict = False)
    if len(m) > 0 and verbose:
        print("Недостающие параметры:")
        print(m)
    if len(u) > 0 and verbose:
        print("Некорректные параметры:")
        print(u)
    model.cuda()
    model.eval()
    return model

def load_img(path, max_dim):
    image = Image.open(path).convert("RGB")
    w, h = image.size
    cur_dim = w * h
    if cur_dim > max_dim:
        k = cur_dim / max_dim
        sk = float(k ** (0.5))
        w = int(w / sk)
        h = int(h / sk)
    print(f"загружено входное изображение размера ({w}, {h}) из папки {path}")
    w, h = map(lambda x: x - x % 64, (w, h))  # изменение размера в целое число, кратное 64-м
    image = image.resize((w, h), resample = PIL.Image.LANCZOS)
    print(f"размер изображения изменён на ({w}, {h} (w, h))")
    return image

def Stable_diffusion(ws, work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    init_img_path = work_path + "/" + img_name
    if need_restore == True:
        result_img = "c_picture_"
    else:
        result_img = "picture_"
    if AI_prompt: 
        pfile = work_path + "/AI_caption_" + str(img_suf - 1) + ".txt"
    else:
        pfile = work_path + "/Human_caption_" + str(img_suf - 1) + ".txt"
    with open(pfile, "r") as f:
        prompt = f.read()
    seed_everything(opt['seed'])
    config = OmegaConf.load(config_path + config_list[checkpoint_list[opt["ckpt"]][1]])
    model = load_model_from_config(ws, config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    init_image = repeat((2. * torch.from_numpy((np.array(load_img(init_img_path, opt["max_dim"])).astype(np.float32) / 255.0)[None].transpose(0, 3, 1, 2)) - 1.).to(device), '1 ... -> b ...', b = 1)
    init_latent = model.get_first_stage_encoding(model.encode_first_stage(init_image))  # переместить в латентное пространство
    sampler.make_schedule(ddim_num_steps = opt['ddim_steps'], ddim_eta = opt['ddim_eta'], verbose = False)
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
                w, h = img.size
                buf = io.BytesIO()
                img.save(buf, format = "PNG")
                b_data = buf.getvalue()
                img.save(work_path + "\\" + result_img + str(img_suf) + ".png")
                img.close
    return w, h, b_data