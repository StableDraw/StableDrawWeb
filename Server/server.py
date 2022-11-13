import asyncio
from cmath import sqrt
import websockets
import requests
import base64
import json
import ssl
import os
import time
import torch
import numpy as np
from fairseq import utils, tasks
from fairseq import checkpoint_utils
from tasks.mm_tasks.caption import CaptionTask
from PIL import Image
from torchvision import transforms
from utils.eval_utils import eval_caption
import PIL
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
from ldm.models.diffusion.plms import PLMSSampler

checkpoint_path = 'caption.pt'
if not os.path.exists(checkpoint_path):
    import urllib.request
    urllib.request.urlretrieve("https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt", checkpoint_path)
with open("token.txt", "r") as f:
    TOKEN = f.read()

URL = "https://api.telegram.org/bot{}/".format(TOKEN)

task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ, user_id
bufer_task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ, user_id, номер последнего ответа ТГ

user_id = "0" #Пока что мы не знаем id

process = False
nprocess = False

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
        'prompt': "rabbit" ,                  #описание изображения для рендеринга
        'style': "4k photorealistic",         #стиль изображения для рентеринга
        'init_img': "input/12.png",           #путь к входному изображению
        'outdir': "outputs/img2img-samples",  #дирректория, в которую выводится результат
        'skip_grid': True,                    #не сохранять сетку, только отдельные изображения. Полезно при оценке большого количества изображений
        'skip_save': False,                   #не сохранять отдельные образцы. Необходимо для измерения скорости
        'ddim_steps': 50,                     #количество шагов выборки ddim
        'plms': False,                        #использовать выборку plms
        'fixed_code': False,                  #если включено, использует один и тот же начальный код для всех образцов
        'ddim_eta': 0.0,                      #ddim η (η=0.0 соответствует детерминированной выборке)
        'n_iter': 1,                          #определяет частоту дискретизации
        'C': 4,                               #латентные каналы
        'f': 8,                               #коэффициент понижающей дискретизации, чаще всего 8 или 16
        'n_samples': 1,                       #сколько изображений производить для каждой заданной подсказки. Также размер батча
        'n_rows': 0,                          #строк в сетке (по умолчанию: n_samples)
        'scale': 5.0,                         #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
        'strength': 0.8,                      #сила увеличения/уменньшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
        'from_file': "",                      #если указано, загружать подсказки из этого файла
        'config': "configs/stable-diffusion/v1-inference.yaml", #путь к конфигерационному файлу строения модели
        'ckpt': "models/ldm/stable-diffusion-v1/sd-v1-1.ckpt", #путь к контрольной точке модели
        'seed': 42,                           #сид (для воспроизводимой генерации изображений)
        'precision': "autocast"               #оценивать с этой точностью ("full" или "autocast")
        }
    
    opt['outdir'] = work_path
    opt['init_img'] = work_path + "/drawing.png"
    if AI_prompt: 
        pfile = work_path + "/AI_caption.txt"
    else:
        pfile = work_path + "/Human_caption.txt"
    with open(pfile, "r") as f:
        opt['prompt'] = f.read()
    seed_everything(opt['seed'])

    config = OmegaConf.load(opt['config'])
    model = await load_model_from_config(ws, config, opt['ckpt'])

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
        prompt = opt['prompt'] + " " + opt['style']
        assert prompt is not None
        data = [batch_size * [prompt]]

    else:
        #await ws.send(json.dumps({'0' : "t", '1' : "Чтение описания..."}))
        #print(f"чтение описания из " + opt['from_file'])
        with open(opt['from_file'], "r") as f:
            data = f.read().splitlines()
            data = list(await chunk(data, batch_size))

    sample_path = os.path.join(outpath, "samples")
    os.makedirs(sample_path, exist_ok=True)
    base_count = len(os.listdir(sample_path))
    grid_count = len(os.listdir(outpath)) - 1

    assert os.path.isfile(opt['init_img'])
    with Image.open(opt['init_img']).convert("RGB") as image:
        orig_w, orig_h = image.size
    #await ws.send(json.dumps({'0' : "t", '1' : "Загруженно изображение размера (" + str(orig_w) + "x" + str(orig_h) +")"}))
    init_image = load_img(opt['init_img']).to(device)
    init_image = repeat(init_image, '1 ... -> b ...', b=batch_size)
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
                all_samples = list()
                for n in trange(opt['n_iter'], desc="Sampling"):
                    for prompts in tqdm(data, desc="data"):
                        uc = None
                        if opt['scale'] != 1.0:
                            uc = model.get_learned_conditioning(batch_size * [""])
                        if isinstance(prompts, tuple):
                            prompts = list(prompts)
                        c = model.get_learned_conditioning(prompts)

                        # encode (scaled latent)
                        z_enc = sampler.stochastic_encode(init_latent, torch.tensor([t_enc]*batch_size).to(device))
                        # decode it
                        samples = sampler.decode(z_enc, c, t_enc, unconditional_guidance_scale=opt['scale'], unconditional_conditioning=uc)

                        x_samples = model.decode_first_stage(samples)
                        x_samples = torch.clamp((x_samples + 1.0) / 2.0, min=0.0, max=1.0)

                        if not opt['skip_save']:
                            for x_sample in x_samples:
                                x_sample = 255. * rearrange(x_sample.cpu().numpy(), 'c h w -> h w c')
                                Image.fromarray(x_sample.astype(np.uint8)).save(
                                    os.path.join(sample_path, f"{base_count:05}.png"))
                                base_count += 1
                        all_samples.append(x_samples)

                if not opt['skip_grid']:
                    # additionally, save as grid
                    grid = torch.stack(all_samples, 0)
                    grid = rearrange(grid, 'n b c h w -> (n b) c h w')
                    grid = make_grid(grid, nrow=n_rows)

                    # to image
                    grid = 255. * rearrange(grid, 'c h w -> h w c').cpu().numpy()
                    Image.fromarray(grid.astype(np.uint8)).save(os.path.join(outpath, f'grid-{grid_count:04}.png'))
                    grid_count += 1
    img = Image.open(outpath + "/samples/00000.png")
    img.save(outpath + "/AI_picture.png")
    w, h = img.size
    img.close
    os.remove(outpath + "/samples/00000.png")
    os.rmdir(outpath + "/samples")
    with open(outpath + "/AI_picture.png", "rb") as image_file:
        b_data = image_file.read()
    return w, h, b_data


# Подготовка теста
def encode_text(text, task, length=None, append_bos=False, append_eos=False):
    bos_item = torch.LongTensor([task.src_dict.bos()])
    eos_item = torch.LongTensor([task.src_dict.eos()])
    s = task.tgt_dict.encode_line(
        line=task.bpe.encode(text),
        add_if_not_exist=False,
        append_eos=False
    ).long()
    if length is not None:
        s = s[:length]
    if append_bos:
        s = torch.cat([bos_item, s])
    if append_eos:
        s = torch.cat([s, eos_item])
    return s

# Формирование выхода для задания подписи
def construct_sample(image: Image, task, patch_resize_transform):
    pad_idx = task.src_dict.pad()
    patch_image = patch_resize_transform(image).unsqueeze(0)
    patch_mask = torch.tensor([True])
    src_text = encode_text(" what does the image describe?", task, append_bos=True, append_eos=True).unsqueeze(0)
    src_length = torch.LongTensor([s.ne(pad_idx).long().sum() for s in src_text])
    sample = {
        "id": np.array(['42']),
        "net_input": {
            "src_tokens": src_text,
            "src_lengths": src_length,
            "patch_images": patch_image,
            "patch_masks": patch_mask
        }
    }
    return sample

# Функция, меняющая FP32 на FP16
def apply_half(t):
    if t.dtype is torch.float32:
        return t.to(dtype=torch.half)
    return t

async def Gen_caption(ws, img_path):
    tasks.register_task('caption', CaptionTask)
    use_cuda = torch.cuda.is_available()
    use_fp16 = False

    # Загрузка претренированных ckpt и config
    #await ws.send(json.dumps({'0' : "t", '1' : "Загрузка претренированных чекпоинтов и настроек конфигурации..."}))
    overrides={"eval_cider":False, "beam":5, "max_len_b":16, "no_repeat_ngram_size":3, "seed":7}
    models, cfg, task = checkpoint_utils.load_model_ensemble_and_task(utils.split_paths(checkpoint_path), arg_overrides=overrides)

    # Перемещение моделей на GPU
    for model in models:
        model.eval()
        if use_fp16:
            model.half()
        if use_cuda and not cfg.distributed_training.pipeline_model_parallel:
            model.cuda()
        model.prepare_for_inference_(cfg)

    # Инициализация генератора
    generator = task.build_generator(models, cfg.generation)

    # Преобразование изображений
    mean = [0.5, 0.5, 0.5]
    std = [0.5, 0.5, 0.5]
    patch_resize_transform = transforms.Compose(
        [
            lambda image: image.convert("RGB"),
            transforms.Resize((cfg.task.patch_image_size, cfg.task.patch_image_size), interpolation=Image.Resampling.BICUBIC),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std),
        ]
    )

    image = Image.open(img_path)

    # Построение выходного образца и подготовка GPU, если доступна CUDA
    #await ws.send(json.dumps({'0' : "t", '1' : "Построение выходного образца..."}))
    sample = construct_sample(image, task, patch_resize_transform)
    sample = utils.move_to_cuda(sample) if use_cuda else sample
    sample = utils.apply_to_sample(apply_half, sample) if use_fp16 else sample

    # Запуск эволюционного шага для подписи
    #await ws.send(json.dumps({'0' : "t", '1' : "Вычисление подписи..."}))
    with torch.no_grad():
        result, scores = eval_caption(task, generator, models, sample)

    caption = result[0]['caption']
    return caption

async def neural_processing(process, nprocess):
    if nprocess == True:
        return
    while process:
        nprocess = True
        if len(task_list) != 0:
            task = task_list.pop(0)
            websocket = task[0]
            await websocket.send(json.dumps({'0' : "t", '1' : "Обработка началась"}))
            path_to_task_dir = "log/" + task[3] + "/"  + task[2]
            if task[1] == 'c': #если нужно сгенерировать подпись
                client_message = await Gen_caption(websocket, path_to_task_dir + "/drawing.png")
                with open(path_to_task_dir + "/AI_caption.txt", "w") as f:
                    f.write(client_message)
                resp_data = {
                    '0' : "t",
                    '1' : client_message,
                }
                req = requests.post(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + task[2] + "&chat_id=-1001784737051")
            if task[1] == 'p': #если нужно сгенерировать изображение по AI подписи
                w, h, binary_data = await Stable_diffusion(websocket, path_to_task_dir, True) #передаю сокет, путь к рабочей папке, и true если AI подпись, false если человеческая
                img = base64.b64encode(binary_data).decode('utf-8')
                resp_data = {
                    '0' : "i",
                    '1' : str(img),
                    '2' : w,
                    '3' : h
                }
                files = {'document': ('drawing.png', binary_data)}
                req = requests.post(URL + "sendDocument?&reply_to_message_id=" + task[4] + "&chat_id=-1001784737051", files = files)
            content = req.content.decode("utf8")
            content_json = json.loads(content)
            message_id = str(content_json["result"]["message_id"])
            bufer_task_list.append([task[0], task[1], task[2], task[3], message_id])
            await websocket.send(json.dumps(resp_data))
        else:
            process = False
            nprocess = False



async def handler(websocket):
    user_path = "log/" + user_id
    if os.path.isdir(user_path):
        file_time = round(os.path.getctime(user_path))
        now_tome = round(time.time())
        wait_time = now_tome - file_time
        with open(user_path + "/limit.txt", "r") as f:
            limit = int(f.read())
        if limit != -1:
            if wait_time > 86400: #в день
                limit = 25 #дневная норма
            limit -= 1
            with open(user_path + "/limit.txt", "w") as f:
                f.write(str(limit))
        if limit == 0:
            resp_data = {
                '0' : "t",
                '1' : "У вас не осталось попыток на сегодня. Подождите " + str(86400 - wait_time) + " секунд, чтобы продолжить, либо оформите платную подписку на сервис"
            }
            await websocket.send(json.dumps(resp_data))
            websocket.close()
            return
    else:
        os.mkdir(user_path)
        with open(user_path + "/limit.txt", "w") as f:
            f.write(24)
    try:
        while True:
            try:
                jsonData = await websocket.recv()
            except:
                try:
                    task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))
                except:
                    print("Клиент слишком рано разорвал соединение")
                try:
                    bufer_task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))
                except:
                    print("В буферном списке заданий его не было")
                break
            dictData = json.loads(jsonData)
            if(dictData["type"] == "d"):
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                files = {'document': ('drawing.png', binary_data)}
                req = requests.post(URL + "sendDocument?chat_id=-1001784737051", files = files)
                content = req.content.decode("utf8")
                content_json = json.loads(content)
                message_id = str(content_json["result"]["message_id"])
                task_dir = user_path + "/" + str(message_id)
                os.mkdir(task_dir)
                with open(task_dir + "/drawing.png", "wb") as f:
                    f.write(binary_data)
                task_list.append([websocket, "c", message_id, user_id]) #нужна подпись
            elif(dictData["type"] == "g"):
                if len(bufer_task_list) == 1:#Костыль. Узнать, почему не работает и заменить в срочном порядке
                    cur_task = bufer_task_list.pop(0)
                else:
                    cur_task = bufer_task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))
                print("g")
                cur_task[1] = "p" #нужна картина по AI подписи
                cur_task[0] = websocket #не знаю, нужна ли эта строчка
                task_list.append(cur_task)
            tls = len(task_list)
            if tls > 1:
                client_message = "Ожидайте. Человек перед вами: " + str(tls - 1)
            else:
                client_message = "Обработка начнётся прямо сейчас..."
            resp_data = {
                '0' : "t",
                '1' : client_message
            }
            await websocket.send(json.dumps(resp_data))
            process = True
            await neural_processing(process, nprocess)
            '''
                imgt = Image.open("rickroll.jpg")
                w, h = imgt.size
                imgt.close
                with open("rickroll.jpg", "rb") as image_file:
                    img = base64.b64encode(image_file.read()).decode('utf-8')
                resp_data = {
                    '0' : "i",
                    '1' : str(img),
                    '2' : w,
                    '3' : h
                }
                await websocket.send(json.dumps(resp_data))
                '''
    finally:
        print("Соединение разорвано со стороны пользователя")
        task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))
        bufer_task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("C:/Apache24/ssl/domain_name.crt", "C:/Apache24/ssl/private.key")
start_server = websockets.serve(handler, "stabledraw.com", 8081, ssl = ssl_context, max_size = None)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()