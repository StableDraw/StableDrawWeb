import io
import torch
import numpy as np
import safetensors.torch
from PIL import Image
from omegaconf import OmegaConf
from einops import repeat, rearrange
from pytorch_lightning import seed_everything
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.data.util import AddMiDaS

torch.set_grad_enabled(False)

checkpoint_path = "models\\ldm\\stable-diffusion-v2\\dept2img\\"
checkpoint_list = ["512-depth-ema.ckpt"]
config_path = "configs\\stable-diffusion\\"
config_list = ["v2-midas-inference.yaml"]

def initialize_model(config, ckpt):
    config = OmegaConf.load(config)
    model = instantiate_from_config(config.model)
    print(f"Загрузка модели из {ckpt}")
    if ckpt[ckpt.rfind('.'):] == ".safetensors":
        pl_sd = safetensors.torch.load_file(ckpt, device = "cpu")
    else:
        pl_sd = torch.load(ckpt, map_location = "cpu")
    sd = pl_sd["state_dict"] if "state_dict" in pl_sd else pl_sd
    model.load_state_dict(sd, strict = False)
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    return sampler

def make_batch_sd(image, txt, device, model_type):
    image = np.array(image.convert("RGB"))
    image = torch.from_numpy(image).to(dtype=torch.float32) / 127.5 - 1.0
    # sample["jpg"] это тензор hwc в [-1, 1] в этом месте
    midas_trafo = AddMiDaS(model_type = model_type)
    batch = {
        "jpg": image,
        "txt": [txt],
    }
    batch = midas_trafo(batch)
    batch["jpg"] = rearrange(batch["jpg"], 'h w c -> 1 c h w')
    batch["jpg"] = repeat(batch["jpg"].to(device=device), "1 ... -> n ...", n = 1)
    batch["midas_in"] = repeat(torch.from_numpy(batch["midas_in"][None, ...]).to(device=device), "1 ... -> n ...", n = 1)
    return batch

def Stable_diffusion_2_depth_to_image():
    opt = {
        "input": "img.png",
        "output": "picture.png",
        "prompt": "An aple with green leaf",
        "model_type": "dpt_hybrid",
        "seed": 0, #от 0 до 1000000
        "scale": 9.0, #от 0.1 до 30.0
        "steps": 50, #Шаги DDIM, от 0 до 50
        "strength": 0.9 #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
    }
    ckpt = checkpoint_path + checkpoint_list[0]
    config = config_path + config_list[0]
    sampler = initialize_model(config, ckpt)
    image = Image.open(opt["input"])
    w, h = image.size
    print(f"загружено изображение размера ({w}, {h})")
    width, height = map(lambda x: x - x % 64, (w, h))  # изменение размера на целое, кратное 64-ём
    image = image.resize((width, height))
    print(f"размер изображения изменён на ({width}, {height} (w, h))")
    assert 0. <= opt["strength"] <= 1., "может работать с параметром шума в интервале от 0.0 до 1.0"
    if opt["strength"] == 1.:
        do_full_sample = True
    else:
        do_full_sample = False
    t_enc = min(int(opt["strength"] * opt["steps"]), opt["steps"] - 1)
    sampler.make_schedule(opt["steps"], ddim_eta = 0., verbose = True)
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = sampler.model
    seed_everything(opt["seed"])
    with torch.no_grad(),\
            torch.autocast("cuda"):
        batch = make_batch_sd(image, txt = opt["prompt"], device = device, model_type = opt["model_type"])
        z = model.get_first_stage_encoding(model.encode_first_stage(batch[model.first_stage_key]))  # move to latent space
        c = model.cond_stage_model.encode(batch["txt"])
        c_cat = list()
        for ck in model.concat_keys:
            cc = batch[ck]
            cc = model.depth_model(cc)
            depth_min, depth_max = torch.amin(cc, dim = [1, 2, 3], keepdim=True), torch.amax(cc, dim = [1, 2, 3], keepdim = True)
            cc = torch.nn.functional.interpolate(cc, size = z.shape[2:], mode = "bicubic", align_corners = False, )
            depth_min, depth_max = torch.amin(cc, dim = [1, 2, 3], keepdim=True), torch.amax(cc, dim = [1, 2, 3], keepdim = True)
            cc = 2. * (cc - depth_min) / (depth_max - depth_min) - 1.
            c_cat.append(cc)
        c_cat = torch.cat(c_cat, dim = 1)
        # условие
        cond = {"c_concat": [c_cat], "c_crossattn": [c]}
        # безусловное условие
        uc_cross = model.get_unconditional_conditioning(1, "")
        uc_full = {"c_concat": [c_cat], "c_crossattn": [uc_cross]}
        if not do_full_sample:
            # закодировать (латентное изменение размера)
            z_enc = sampler.stochastic_encode(z, torch.tensor([t_enc]).to(model.device))
        else:
            z_enc = torch.randn_like(z)
        # декодирование
        samples = sampler.decode(z_enc, cond, t_enc, unconditional_guidance_scale = opt["scale"], unconditional_conditioning = uc_full, )
        x_sample = 255. * rearrange(torch.clamp((model.decode_first_stage(samples) + 1.0) / 2.0, min = 0.0, max = 1.0)[0].cpu().numpy(), 'c h w -> h w c')
    image = Image.fromarray(x_sample.astype(np.uint8))
    buf = io.BytesIO()
    image.save(buf, format = "PNG")
    b_data = buf.getvalue()
    image.save(opt["output"])
    image.close