import io
import torch
import numpy as np
import safetensors.torch
import PIL
from PIL import Image
from omegaconf import OmegaConf
from einops import repeat
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.util import instantiate_from_config

torch.set_grad_enabled(False)

checkpoint_path = 'models\\ldm\\stable-diffusion\\inpainting\\'
checkpoint_list = [
    ["512-inpainting-ema.safetensors", 1],
    ["galaxytimemachines_v3.safetensors", 0],
]
config_path = "configs\\stable-diffusion\\"
config_list = ["v1-inpainting-inference.yaml", "v2-inpainting-inference.yaml"]

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

def make_batch_sd_inp(image, mask, txt, device):
    image = np.array(image.convert("RGB"))
    image = image[None].transpose(0, 3, 1, 2)
    image = torch.from_numpy(image).to(dtype = torch.float32) / 127.5 - 1.0
    mask = np.array(mask.convert("L"))
    mask = mask.astype(np.float32) / 255.0
    mask = mask[None, None]
    mask[mask < 0.5] = 0
    mask[mask >= 0.5] = 1
    mask = torch.from_numpy(mask)
    masked_image = image * (mask < 0.5)
    batch = {
        "image": repeat(image.to(device = device), "1 ... -> n ...", n = 1),
        "txt": [txt],
        "mask": repeat(mask.to(device = device), "1 ... -> n ...", n = 1),
        "masked_image": repeat(masked_image.to(device = device), "1 ... -> n ...", n = 1),
    }
    return batch

def Stable_diffusion_inpainting(ws, work_path, img_name, img_suf, need_restore, opt):
    init_img = work_path + "/" + img_name
    mask_path = work_path + "/mask_" + str(img_suf - 1) + ".png"
    if need_restore == True:
        result_img = "c_picture_"
    else:
        result_img = "picture_"
    pfile = work_path + "/Human_caption_" + str(img_suf - 1) + ".txt"
    with open(pfile, "r") as f:
        prompt = f.read()
    config = OmegaConf.load(config_path + config_list[checkpoint_list[opt["ckpt"]][1]])
    model = load_model_from_config(ws, config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    sampler.make_schedule(ddim_num_steps = opt['ddim_steps'], ddim_eta = opt['ddim_eta'], verbose = opt["verbose"])
    image = load_img(init_img, opt["max_dim"])
    w, h = image.size
    mask = Image.open(mask_path).resize((w, h))
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = sampler.model
    prng = np.random.RandomState(opt["seed"])
    start_code = prng.randn(1, 4, h // 8, w // 8)
    start_code = torch.from_numpy(start_code).to(device = device, dtype = torch.float32)
    with torch.no_grad(), \
            torch.autocast("cuda"):
            batch = make_batch_sd_inp(image, mask, txt = prompt, device = device)
            c = model.cond_stage_model.encode([prompt])
            c_cat = list()
            for ck in model.concat_keys:
                cc = batch[ck].float()
                if ck != model.masked_image_key:
                    bchw = [1, 4, h // 8, w // 8]
                    cc = torch.nn.functional.interpolate(cc, size = bchw[-2:])
                else:
                    cc = model.get_first_stage_encoding(model.encode_first_stage(cc))
                c_cat.append(cc)
            c_cat = torch.cat(c_cat, dim = 1)
            # услолвие
            cond = {"c_concat": [c_cat], "c_crossattn": [c]}
            # безусловное условие
            uc_cross = model.get_unconditional_conditioning(1, "")
            uc_full = {"c_concat": [c_cat], "c_crossattn": [uc_cross]}
            shape = [model.channels, h // 8, w // 8]
            samples_cfg = sampler.sample(opt["ddim_steps"], 1, shape, cond, opt["verbose"], eta = opt["ddim_eta"], unconditional_guidance_scale=opt["scale"], unconditional_conditioning=uc_full, x_T=start_code, )[0]
            x_samples_ddim = model.decode_first_stage(samples_cfg)
            result = torch.clamp((x_samples_ddim + 1.0) / 2.0, min = 0.0, max = 1.0).cpu().numpy().transpose(0, 2, 3, 1) * 255
    image = [Image.fromarray(img.astype(np.uint8)) for img in result][0]
    buf = io.BytesIO()
    image.save(buf, format = "PNG")
    b_data = buf.getvalue()
    image.save(work_path + "\\" + result_img + str(img_suf) + ".png")
    image.close
    return w, h, b_data