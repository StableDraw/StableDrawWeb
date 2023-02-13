import io
import torch
import numpy as np
import safetensors.torch
import PIL
from PIL import Image
from omegaconf import OmegaConf
from einops import repeat, rearrange
from pytorch_lightning import seed_everything
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.util import exists, instantiate_from_config
from ldm.models.diffusion.ddpm import LatentUpscaleDiffusion, LatentUpscaleFinetuneDiffusion

torch.set_grad_enabled(False)

checkpoint_path = "models\\ldm\\stable-diffusion\\upscaler\\"
checkpoint_list = [
    "x4-upscaler-ema.safetensors"
]
config_path = "configs\\stable-diffusion\\"
config_list = ["x4-upscaling.yaml"]

def load_model_from_config(ws, config, ckpt, verbose):
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

def make_batch_sd_ups(image, txt, device):
    image = np.array(image.convert("RGB"))
    image = torch.from_numpy(image).to(dtype = torch.float32) / 127.5 - 1.0
    batch = {
        "lr": rearrange(image, 'h w c -> 1 c h w'),
        "txt": [txt],
    }
    batch["lr"] = repeat(batch["lr"].to(device=device), "1 ... -> n ...", n = 1)
    return batch

def make_noise_augmentation(model, batch, noise_level = None):
    x_low = batch[model.low_scale_key]
    x_low = x_low.to(memory_format = torch.contiguous_format).float()
    x_aug, noise_level = model.low_scale_model(x_low, noise_level)
    return x_aug, noise_level

def Stable_diffusion_upscaler(ws, work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    init_img = work_path + "\\" + img_name
    if need_restore == True:
        result_img = "c_big_image_"
    else:
        result_img = "big_image_"
    if AI_prompt: 
        pfile = work_path + "/AI_caption_" + str(img_suf - 1) + ".txt"
    else:
        pfile = work_path + "/Human_caption_" + str(img_suf - 1) + ".txt"
    with open(pfile, "r") as f:
        prompt = f.read()
    image = load_img(init_img, opt["max_dim"])
    w, h = image.size
    config = OmegaConf.load(config_path + config_list[0])
    model = load_model_from_config(ws, config, checkpoint_path + checkpoint_list[opt["ckpt"]], opt["verbose"])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    sampler.make_schedule(ddim_num_steps = opt['ddim_steps'], ddim_eta = opt['ddim_eta'], verbose = opt["verbose"])
    if isinstance(sampler.model, LatentUpscaleDiffusion):
        noise_level = torch.Tensor([opt["noise_augmentation"]]).to(sampler.model.device).long()
    sampler.make_schedule(opt["ddim_steps"], ddim_eta = opt["ddim_eta"], verbose = opt["verbose"])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = sampler.model
    seed_everything(opt["seed"])
    prng = np.random.RandomState(opt["seed"])
    start_code = prng.randn(1, model.channels, h , w)
    start_code = torch.from_numpy(start_code).to(device = device, dtype = torch.float32)
    with torch.no_grad(),\
            torch.autocast("cuda"):
        batch = make_batch_sd_ups(image, txt = prompt, device = device)
        c = model.cond_stage_model.encode(batch["txt"])
        c_cat = list()
        if isinstance(model, LatentUpscaleFinetuneDiffusion):
            for ck in model.concat_keys:
                cc = batch[ck]
                if exists(model.reshuffle_patch_size):
                    assert isinstance(model.reshuffle_patch_size, int)
                    cc = rearrange(cc, 'b c (p1 h) (p2 w) -> b (p1 p2 c) h w', p1 = model.reshuffle_patch_size, p2 = model.reshuffle_patch_size)
                c_cat.append(cc)
            c_cat = torch.cat(c_cat, dim = 1)
            # условие
            cond = {"c_concat": [c_cat], "c_crossattn": [c]}
            # безусловное условие
            uc_cross = model.get_unconditional_conditioning(1, "")
            uc_full = {"c_concat": [c_cat], "c_crossattn": [uc_cross]}
        elif isinstance(model, LatentUpscaleDiffusion):
            x_augment, noise_level = make_noise_augmentation(model, batch, noise_level)
            cond = {"c_concat": [x_augment], "c_crossattn": [c], "c_adm": noise_level}
            # безусловное условие
            uc_cross = model.get_unconditional_conditioning(1, "")
            uc_full = {"c_concat": [x_augment], "c_crossattn": [uc_cross], "c_adm": noise_level}
        else:
            raise NotImplementedError()
        shape = [model.channels, h, w]
        samples = sampler.sample(opt["ddim_steps"], 1, shape, cond, verbose = opt["verbose"], eta = opt["ddim_eta"], unconditional_guidance_scale = opt["scale"], unconditional_conditioning = uc_full, x_T = start_code, )[0]
    with torch.no_grad():
        x_samples_ddim = model.decode_first_stage(samples)
    result = torch.clamp((x_samples_ddim + 1.0) / 2.0, min = 0.0, max = 1.0)
    result = result.cpu().numpy().transpose(0, 2, 3, 1) * 255
    print(f"размер апскейленого изображения: {result.shape}")
    image = [Image.fromarray(img.astype(np.uint8)) for img in result][0]
    w, h = image.size
    buf = io.BytesIO()
    image.save(buf, format = "PNG")
    b_data = buf.getvalue()
    image.save(work_path + "\\" + result_img + str(img_suf) + ".png")
    image.close
    return w, h, b_data