import asyncio
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

checkpoint_path = 'caption.pt'
if not os.path.exists(checkpoint_path):
    import urllib.request
    urllib.request.urlretrieve("https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt", checkpoint_path)
with open("token.txt", "r") as f:
    TOKEN = f.read()

URL = "https://api.telegram.org/bot{}/".format(TOKEN)

task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ, user_id

user_id = "0" #Пока что мы не знаем id

process = False
nprocess = False


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
    await ws.send(json.dumps({'0' : "t", '1' : "Загрузка претренированных чекпоинтов и настроек конфигурации..."}))
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
    await ws.send(json.dumps({'0' : "t", '1' : "Построение выходного образца..."}))
    sample = construct_sample(image, task, patch_resize_transform)
    sample = utils.move_to_cuda(sample) if use_cuda else sample
    sample = utils.apply_to_sample(apply_half, sample) if use_fp16 else sample

    # Запуск эволюционного шага для подписи
    await ws.send(json.dumps({'0' : "t", '1' : "Вычисление подписи..."}))
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
            if task[1] == 'c': #если нужно сгенерировать подпись
                path_to_task_dir = "log/" + task[3] + "/"  + task[2]
                client_message = await Gen_caption(websocket, path_to_task_dir + "/drawing.png")
                with open(path_to_task_dir + "/AI_caption.txt", "w") as f:
                    f.write(client_message)
                req = requests.post(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + task[2] + "&chat_id=-1001784737051")
                await websocket.send(json.dumps({'0' : "t", '1' : client_message}))
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
                    ind = next(i for i, (x, _) in enumerate(task_list) if x == websocket) #получить индекс текущего вебсокета в списке заданий
                    task_list.pop(ind)
                except:
                    print("Клиент слишком рано разорвал соединение")
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
                task_list.append([websocket, "c", message_id, user_id])
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

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("C:/Apache24/ssl/domain_name.crt", "C:/Apache24/ssl/private.key")
start_server = websockets.serve(handler, "stabledraw.com", 8081, ssl = ssl_context, max_size = None)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()