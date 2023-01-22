import os
import io
import cv2
import torch
import numpy as np
from omegaconf import OmegaConf
from PIL import Image
from tqdm import trange
from itertools import islice
from einops import rearrange
from pytorch_lightning import seed_everything
from torch import autocast
from contextlib import nullcontext
from imwatermark import WatermarkEncoder
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.models.diffusion.plms import PLMSSampler
from ldm.models.diffusion.dpm_solver import DPMSolverSampler
torch.set_grad_enabled(False)

checkpoint_path = 'models\\ldm\\stable-diffusion-v2\\'
checkpoint_list = ["v2-1_512-ema-pruned.ckpt", "v2-1_768-ema-pruned.ckpt"]

def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

def load_model_from_config(config, ckpt, verbose = False):
    print(f"Загрузка модели из {ckpt}")
    pl_sd = torch.load(ckpt, map_location = "cpu")
    if "global_step" in pl_sd:
        print(f"Глобальный шаг: {pl_sd['global_step']}")
    sd = pl_sd["state_dict"]
    model = instantiate_from_config(config.model)
    m, u = model.load_state_dict(sd, strict = False)
    if len(m) > 0 and verbose:
        print("пропущенные параметры:\n", m)
    if len(u) > 0 and verbose:
        print("некорректные параматры:")
        print(u)
    model.cuda()
    model.eval()
    return model

def put_watermark(img, wm_encoder=None):
    if wm_encoder is not None:
        img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
        img = wm_encoder.encode(img, 'dwtDct')
        img = Image.fromarray(img[:, :, ::-1])
    return img

async def Stable_diffusion_2_text_to_image(ws, work_path, prompt, opt):
    if (opt["ckpt"] == 0):
        w = 512
        h = 512
    elif (opt["ckpt"] == 1):
        w = 768
        h = 768
    seed_everything(opt["seed"])
    config = OmegaConf.load("configs/stable-diffusion/v2-inference.yaml")
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"]])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    if opt["plms"]:
        sampler = PLMSSampler(model)
    elif opt["dpm"]:
        sampler = DPMSolverSampler(model)
    else:
        sampler = DDIMSampler(model)
    print("Инициализация дешифровщика невидимого водяного знака...")
    wm = "SDV2"
    wm_encoder = WatermarkEncoder()
    wm_encoder.set_watermark('bytes', wm.encode('utf-8'))
    precision_scope = autocast if opt["precision"] == "autocast" else nullcontext
    with torch.no_grad(), \
        precision_scope("cuda"), \
        model.ema_scope():
            if opt["scale"] != 1.0:
                uc = model.get_learned_conditioning([""])
            else:
                uc = None
            c = model.get_learned_conditioning([prompt])
            shape = [opt["C"], h // opt["f"], w // opt["f"]]
            samples, _ = sampler.sample(S = opt["steps"], conditioning = c, batch_size = 1, shape = shape, verbose = False, unconditional_guidance_scale = opt["scale"], unconditional_conditioning = uc, eta = opt["ddim_eta"], x_T = None)
            x_sample = 255. * rearrange(torch.clamp((model.decode_first_stage(samples) + 1.0) / 2.0, min = 0.0, max = 1.0)[0].cpu().numpy(), 'c h w -> h w c')
            img = Image.fromarray(x_sample.astype(np.uint8))
            img = put_watermark(img, wm_encoder)
            buf = io.BytesIO()
            img.save(buf, format = "PNG")
            b_data = buf.getvalue()
            img.save(work_path + "/tpicture.png")
            img.close
    print("Обработка успешно завершена")
    return w, h, b_data