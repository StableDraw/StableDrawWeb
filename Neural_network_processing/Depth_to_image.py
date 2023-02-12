import io
import torch
import numpy as np
import safetensors.torch
import PIL
from PIL import Image
from omegaconf import OmegaConf
from einops import repeat, rearrange
from pytorch_lightning import seed_everything
from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.data.util import AddMiDaS

torch.set_grad_enabled(False)

checkpoint_path = "models\\ldm\\stable-diffusion\\dept2img\\"
checkpoint_list = [
    ["512-depth-ema.ckpt", 0]
]
config_path = "configs\\stable-diffusion\\"
config_list = ["v2-midas-inference.yaml"]

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

def load_img(path):
    image = Image.open(path).convert("RGB")
    w, h = image.size
    max_dim = pow(512, 2) + 1 # я не могу генерировать на своей видюхе картинки больше 512 на 512
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

def make_batch_sd(image, txt, device, model_type):
    image = np.array(image.convert("RGB"))
    image = torch.from_numpy(image).to(dtype = torch.float32) / 127.5 - 1.0
    # sample["jpg"] это тензор hwc в [-1, 1] в этом месте
    midas_trafo = AddMiDaS(model_type = model_type)
    batch = {
        "jpg": image,
        "txt": [txt],
    }
    batch = midas_trafo(batch)
    batch["jpg"] = rearrange(batch["jpg"], 'h w c -> 1 c h w')
    batch["jpg"] = repeat(batch["jpg"].to(device = device), "1 ... -> n ...", n = 1)
    batch["midas_in"] = repeat(torch.from_numpy(batch["midas_in"][None, ...]).to(device = device), "1 ... -> n ...", n = 1)
    return batch

def Stable_diffusion_depth_to_image(ws, work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    init_img = work_path + "/" + img_name
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
    config = config_path + config_list[checkpoint_list[opt["ckpt"]][1]]
    seed_everything(opt['seed'])
    image = load_img(init_img)
    assert 0. <= opt["strength"] <= 1., "может работать с параметром шума в интервале от 0.0 до 1.0"
    if opt["strength"] == 1.:
        do_full_sample = True
    else:
        do_full_sample = False
    t_enc = min(int(opt["strength"] * opt["ddim_steps"]), opt["ddim_steps"] - 1)
    config = OmegaConf.load(config_path + config_list[checkpoint_list[opt["ckpt"]][1]])
    model = load_model_from_config(ws, config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    sampler.make_schedule(ddim_num_steps = opt['ddim_steps'], ddim_eta = opt['ddim_eta'], verbose = opt["verbose"])
    batch = make_batch_sd(image, txt = prompt, device = device, model_type = opt["model_type"])
    with torch.no_grad(),\
            torch.autocast("cuda"):
        z = model.get_first_stage_encoding(model.encode_first_stage(batch[model.first_stage_key]))  # move to latent space
        c = model.cond_stage_model.encode(batch["txt"])
        c_cat = list()
        cc = model.depth_model(batch["midas_in"])
        depth_min, depth_max = torch.amin(cc, dim = [1, 2, 3], keepdim = True), torch.amax(cc, dim = [1, 2, 3], keepdim = True)
        cc = torch.nn.functional.interpolate(cc, size = z.shape[2:], mode = "bicubic", align_corners = False, )
        depth_min, depth_max = torch.amin(cc, dim = [1, 2, 3], keepdim = True), torch.amax(cc, dim = [1, 2, 3], keepdim = True)
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
    w, h = image.size
    buf = io.BytesIO()
    image.save(buf, format = "PNG")
    b_data = buf.getvalue()
    image.save(work_path + "\\" + result_img + str(img_suf) + ".png")
    image.close
    return w, h, b_data