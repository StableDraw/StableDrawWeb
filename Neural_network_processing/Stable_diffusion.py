import io
import PIL
import torch
import numpy as np
import safetensors.torch
from omegaconf import OmegaConf
from PIL import Image
from torch import autocast
from itertools import islice
from contextlib import nullcontext
from einops import rearrange, repeat
from pytorch_lightning import seed_everything
from ldm.util import exists, instantiate_from_config
from ldm.data.util import AddMiDaS
from ldm.models.diffusion.ddim import DDIMSampler
from ldm.models.diffusion.plms import PLMSSampler
from ldm.models.diffusion.dpm_solver import DPMSolverSampler
from ldm.models.diffusion.ddpm import LatentUpscaleDiffusion, LatentUpscaleFinetuneDiffusion

def chunk(it, size):
    it = iter(it)
    return iter(lambda: tuple(islice(it, size)), ())

def load_model_from_config(config, ckpt, verbose = False):
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
        print("пропущенные параметры:\n", m)
    if len(u) > 0 and verbose:
        print("некорректные параматры:")
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

def Stable_diffusion_text_to_image(work_path, prompt, opt):
    torch.set_grad_enabled(False)
    checkpoint_path = "models\\ldm\\stable-diffusion\\text2img\\"
    checkpoint_list = [
        ["v2-1_512-ema-pruned.safetensors", 1],
        ["v2-1_512-nonema-pruned.safetensors", 1],
        ["v2-1_768-ema-pruned.safetensors", 1],
        ["v2-1_768-nonema-pruned.safetensors", 1],
        ["cornflowerStylizedAnime_v8.safetensors", 0],
    ]
    config_path = "configs\\stable-diffusion\\"
    config_list = ["v1-inference.yaml", "v2-inference.yaml"]
    w = 512
    h = 512
    if (opt["ckpt"] == 1):
        w = 768
        h = 768
    seed_everything(opt["seed"])
    config = OmegaConf.load(config_path + config_list[opt["ckpt"][1]])
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"][0]])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    if opt["plms"]:
        sampler = PLMSSampler(model)
    elif opt["dpm"]:
        sampler = DPMSolverSampler(model)
    else:
        sampler = DDIMSampler(model)
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
            buf = io.BytesIO()
            img.save(buf, format = "PNG")
            b_data = buf.getvalue()
            img.save(work_path + "\\tpicture_1.png")
            img.close
    print("Обработка успешно завершена")
    return w, h, b_data

def Stable_diffusion_image_to_image(work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    checkpoint_path = 'models\\ldm\\stable-diffusion\\img2img\\'
    checkpoint_list = [
        ["sd-v1-1.safetensors", 0],
        ["sd-v1-1-full-ema.safetensors", 0],
        ["sd-v1-2.safetensors", 0],
        ["sd-v1-2-full-ema.safetensors", 0],
        ["sd-v1-3.safetensors", 0],
        ["sd-v1-3-full-ema.safetensors", 0],
        ["sd-v1-4.safetensors", 0],
        ["sd-v1-4-full-ema.safetensors", 0],
        ["sd-v1-5.safetensors", 0],
        ["sd-v1-5-full-ema.safetensors", 0],
    ]
    config_path = "configs\\stable-diffusion\\"
    config_list = ["v1-inference.yaml", "v2-inference.yaml"]
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
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
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

def Stable_diffusion_depth_to_image(work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    torch.set_grad_enabled(False)
    checkpoint_path = "models\\ldm\\stable-diffusion\\dept2img\\"
    checkpoint_list = [
        ["512-depth-ema.safetensors", 0]
    ]
    config_path = "configs\\stable-diffusion\\"
    config_list = ["v2-midas-inference.yaml"]
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
    image = load_img(init_img, opt["max_dim"])
    assert 0. <= opt["strength"] <= 1., "может работать с параметром шума в интервале от 0.0 до 1.0"
    if opt["strength"] == 1.:
        do_full_sample = True
    else:
        do_full_sample = False
    t_enc = min(int(opt["strength"] * opt["ddim_steps"]), opt["ddim_steps"] - 1)
    config = OmegaConf.load(config_path + config_list[checkpoint_list[opt["ckpt"]][1]])
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)
    sampler = DDIMSampler(model)
    sampler.make_schedule(ddim_num_steps = opt['ddim_steps'], ddim_eta = opt['ddim_eta'], verbose = opt["verbose"])
    image = np.array(image.convert("RGB"))
    image = torch.from_numpy(image).to(dtype = torch.float32) / 127.5 - 1.0
    # sample["jpg"] это тензор hwc в [-1, 1] в этом месте
    midas_trafo = AddMiDaS(model_type = opt["model_type"])
    batch = {
        "jpg": image,
        "txt": [prompt],
    }
    batch = midas_trafo(batch)
    batch["jpg"] = repeat(rearrange(batch["jpg"], 'h w c -> 1 c h w').to(device = device), "1 ... -> n ...", n = 1)
    batch["midas_in"] = repeat(torch.from_numpy(batch["midas_in"][None, ...]).to(device = device), "1 ... -> n ...", n = 1)
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

def Stable_diffusion_inpainting(work_path, img_name, img_suf, need_restore, opt):
    torch.set_grad_enabled(False)
    checkpoint_path = 'models\\ldm\\stable-diffusion\\inpainting\\'
    checkpoint_list = [
        ["512-inpainting-ema.safetensors", 1],
        ["galaxytimemachines_v3.safetensors", 0],
    ]
    config_path = "configs\\stable-diffusion\\"
    config_list = ["v1-inpainting-inference.yaml", "v2-inpainting-inference.yaml"]
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
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"]][0])
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
                "txt": [prompt],
                "mask": repeat(mask.to(device = device), "1 ... -> n ...", n = 1),
                "masked_image": repeat(masked_image.to(device = device), "1 ... -> n ...", n = 1),
            }
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

def Stable_diffusion_upscaler(work_path, img_name, img_suf, need_restore, AI_prompt, opt):
    torch.set_grad_enabled(False)
    checkpoint_path = "models\\ldm\\stable-diffusion\\upscaler\\"
    checkpoint_list = [
        "x4-upscaler-ema.safetensors"
    ]
    config_path = "configs\\stable-diffusion\\"
    config_list = ["x4-upscaling.yaml"]
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
    model = load_model_from_config(config, checkpoint_path + checkpoint_list[opt["ckpt"]], opt["verbose"])
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
        image = np.array(image.convert("RGB"))
        image = torch.from_numpy(image).to(dtype = torch.float32) / 127.5 - 1.0
        batch = {
            "lr": rearrange(image, 'h w c -> 1 c h w'),
            "txt": [prompt],
        }
        batch["lr"] = repeat(batch["lr"].to(device = device), "1 ... -> n ...", n = 1)
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
            x_low = batch[model.low_scale_key]
            x_low = x_low.to(memory_format = torch.contiguous_format).float()
            x_augment, noise_level = model.low_scale_model(x_low, noise_level)
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