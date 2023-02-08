import asyncio
import websockets
import requests
import base64
import json
import ssl
import os
import io
import time
from PIL import Image
from googletrans import Translator
from Image_caption_generator import Gen_caption
from Image_to_image import Stable_diffusion
from Image_to_image_2 import Stable_diffusion_2
from Delete_background import Delete_background
from Upscaler import Upscale
from Text_to_image_2 import Stable_diffusion_2_text_to_image
from Text_to_image_Dall_e_2 import Dall_e_2_text_to_image

chat_id = "-1001661093241"
checkpoint_path = 'caption.pt'
if not os.path.exists(checkpoint_path):
    import urllib.request
    urllib.request.urlretrieve("https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt", checkpoint_path)
'''
checkpoint_path = 'models/ldm/stable-diffusion-v1/'
checkpoint_list = ["sd-v1-1.ckpt", 
                   "sd-v1-1-full-ema.ckpt", 
                   "sd-v1-2.ckpt", 
                   "sd-v1-2-full-ema.ckpt", 
                   "sd-v1-3.ckpt", 
                   "sd-v1-3-full-ema.ckpt", 
                   "sd-v1-4.ckpt", 
                   "sd-v1-4-full-ema.ckpt", 
                   "sd-v1-5.ckpt", 
                   "sd-v1-5-full-ema.ckpt"]

if not os.path.exists(checkpoint_path) or not os.path.exists("models\\ldm\\stable-diffusion-v2"):
    os.mkdir(checkpoint_path)
    import urllib.request
    import click
    print("сначала нужно посетить каждую страницу снизу и согласиться с лицензионными соглашениями:")
    for i in range (1, 5):
        print("https://huggingface.co/CompVis/stable-diffusion-v-1-" + str(i) + "-original/resolve/main/")
    print("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/")
    click.pause()
    for i in range (1, 5):
        urllib.request.urlretrieve("https://huggingface.co/CompVis/stable-diffusion-v-1-1-original/resolve/main/sd-v1-" + str(i) + ".ckpt", checkpoint_path + checkpoint_list[2 * (i - 1)])
        urllib.request.urlretrieve("https://huggingface.co/CompVis/stable-diffusion-v-1-1-original/resolve/main/sd-v1-" + str(i) + "-full-ema.ckpt", checkpoint_path + checkpoint_list[2 * (i - 1) + 1])
    urllib.request.urlretrieve("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt", checkpoint_path + checkpoint_list[4])
    urllib.request.urlretrieve("https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned.ckpt", checkpoint_path + checkpoint_list[4])
    urllib.request.urlretrieve("https://cdn-lfs.huggingface.co/repos/18/fc/18fcc3be3bc3077cb1e70baea3953cce46fc54fc20aeba602201371707b7c2ed/d635794c1fedfdfa261e065370bea59c651fc9bfa65dc6d67ad29e11869a1824?response-content-disposition=attachment%3B%20filename%3D%22512-base-ema.ckpt%22&Expires=1669643977&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4tbGZzLmh1Z2dpbmdmYWNlLmNvL3JlcG9zLzE4L2ZjLzE4ZmNjM2JlM2JjMzA3N2NiMWU3MGJhZWEzOTUzY2NlNDZmYzU0ZmMyMGFlYmE2MDIyMDEzNzE3MDdiN2MyZWQvZDYzNTc5NGMxZmVkZmRmYTI2MWUwNjUzNzBiZWE1OWM2NTFmYzliZmE2NWRjNmQ2N2FkMjllMTE4NjlhMTgyND9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPWF0dGFjaG1lbnQlM0IlMjBmaWxlbmFtZSUzRCUyMjUxMi1iYXNlLWVtYS5ja3B0JTIyIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjY5NjQzOTc3fX19XX0_&Signature=QgW77W-DJuhMyCXnIZnF4pmcYbqGsm63nd~oRDvpZ0ZAAmfXz5MG04oFw6ghqMaaVMiph6nvEp5vqLJ0N-CNcauHGOrXbZxy0ntQTlwuxlUVQXG0-W5IZCMRLuj47Db9yCvIm8zMNt~eVDuv1lsfD3in3jO-vwnkYVUAEKdzyelnfirOBAfXfCtnMc9XPmihUUleKnbaizxojaXAFi~ERgjd90SgnCwoCIvzUofwb~GyS0vI3hTv85MtBMcV-FUMsmwgc3KCrnUKj~eO7j69NiiytKL0vzmmYNP7J7ZhktBYCP16rkEGj2OntRvRnQP-amtKOX7kPIzcXRJ-Qc3ycQ__&Key-Pair-Id=KVTP0A1DKRTAX", "models\\ldm\\stable-diffusion-v2\\512-base-ema.ckpt")
    '''
with open("token.txt", "r") as f:
    TOKEN = f.read()

URL = "https://api.telegram.org/bot{}/".format(TOKEN)

task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id

user_id = "0" #Пока что мы не знаем id (убрать)
need_translate = True #пока нет настроек, будем переводить всё (убрать)
dest_lang = "ru"

process = False
nprocess = False

def send_document_to_tg(req_text, tgfile):
    req = requests.post(req_text, files = tgfile)
    content = req.content.decode("utf8")
    content_json = json.loads(content)
    message_id = str(content_json["result"]["message_id"])
    return message_id

def send_message_to_tg(req_text):
    req = requests.post(req_text)
    content = req.content.decode("utf8")
    content_json = json.loads(content)
    message_id = str(content_json["result"]["message_id"])
    return message_id

def del_prompt_about_drawing(prompt, rep_mess_id, noback):
    orig_p = prompt
    del_list = ['a sketch of an ',
                'a sketch of a ',
                'an outline of an ',
                'a outline of an ',
                'an outline of a ',
                'a outline of a ', 
                'drawing of an', 
                ' drawing of a', 
                'a drawing of ', 
                'an image of ',
                'a picture of ',
                "a continuous line of an",
                "a continuous line of a",
                "a continuous line of ",
                "a continuous line ",
                'a retro illustration of an ',
                'a retro illustration of a ',
                'an illustration of an ',
                'an illustration of a ',
                'an illustration of ',
                'a logo of ',
                'a sketch of ',
                'sketch of ',
                'drawing of ',
                'image of ',
                'picture of ',
                'illustration of ',
                'logo of',
                'logo ',
                'logo',
                ' icon',
                ' coloring page',
                ' outline style',
                ' illustration',
                ' isolated',
                'isolated']
    if noback == True:
        del_list.append(' on a white background')
        del_list.append(' with a white background')
    for dw in del_list:
        prompt = prompt.replace(dw, '')
    if prompt != orig_p:
        message_id = send_message_to_tg(URL + "sendMessage?text=" + orig_p + "&reply_to_message_id=" + rep_mess_id + "&chat_id=" + chat_id)
        time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
    else:
        message_id = rep_mess_id
    return prompt, message_id

def Prepare_img(path_dir, image_name, img_suf, no_gen, sim_suf):
    frame_size = 5
    local_image = Image.open(path_dir + "\\" + image_name + "_" + str(img_suf) + ".png").convert("RGBA")
    b_image = local_image
    w, h = local_image.size
    rw, rh = w, h
    p_min = 2 * max(w, h) + min(w, h)
    clr_list = [[(255, 255, 255, 255), 0]]
    for x in range(w):
        clr = local_image.getpixel((x, 0))
        try:
            pos = next(i for i, (x, _) in enumerate(clr_list) if x == clr)
            clr_list[pos][1] += 1
        except:
            clr_list.append([clr, 0])
    for y in range(h):
        clr = local_image.getpixel((0, y))
        try:
            pos = next(i for i, (x, _) in enumerate(clr_list) if x == clr)
            clr_list[pos][1] += 1
        except:
            clr_list.append([clr, 0])
    for x in range(w):
        clr = local_image.getpixel((x, h - 1))
        try:
            pos = next(i for i, (x, _) in enumerate(clr_list) if x == clr)
            clr_list[pos][1] += 1
        except:
            clr_list.append([clr, 0])
    for y in range(h):
        clr = local_image.getpixel((w - 1, y))
        try:
            pos = next(i for i, (x, _) in enumerate(clr_list) if x == clr)
            clr_list[pos][1] += 1
        except:
            clr_list.append([clr, 0])
    need_crop = False
    for i in range(0, len(clr_list)):
        if clr_list[i][1] > p_min:
            need_crop = True
            clr = clr_list[i][0]
            break
    if need_crop:
        frame = True
        while frame:
            for x in range(w):
                new_clr = local_image.getpixel((x, 0))
                if new_clr != clr:
                    frame = False
                    break
            if frame:
                local_image = local_image.crop((0, 1, w, h)).convert("RGBA")
                h -= 1
                if h == 0:
                    buf = io.BytesIO()
                    b_image.save(buf, format = "PNG")
                    b_image.close()
                    binary_data =  buf.getvalue()
                    return True, binary_data
        h_opt = rh - h
        frame = True
        while frame:
            for y in range(h):
                new_clr = local_image.getpixel((0, y))
                if new_clr != clr:
                    frame = False
                    break
            if frame:
                local_image = local_image.crop((1, 0, w, h)).convert("RGBA")
                w -= 1
        w_opt = rw - w
        frame = True
        while frame:
            for x in range(w):
                new_clr = local_image.getpixel((x, h - 1))
                if new_clr != clr:
                    frame = False
                    break
            if frame:
                local_image = local_image.crop((0, 0, w, h - 1)).convert("RGBA")
                h -= 1
        frame = True
        while frame:
            for y in range(h):
                new_clr = local_image.getpixel((w - 1, y))
                if new_clr != clr:
                    frame = False
                    break
            if frame:
                local_image = local_image.crop((0, 0, w - 1, h)).convert("RGBA")
                w -= 1
        dw, dh = rw / w, rh / h
        if w > h:
            pd = 512 / w
            h = int(502 * h / w)
            w = 512 - (frame_size * 2)
            opt2_w = frame_size
            opt2_h = int((512 - h) / 2)
            is_w_bigger = True
        else:
            pd = 512 / h
            w = int(502 * w / h)
            h = 512 - (frame_size * 2)
            opt2_h = frame_size
            opt2_w = int((512 - w) / 2)
            is_w_bigger = False
        local_image = local_image.resize((w, h), resample = Image.Resampling.LANCZOS).convert("RGBA")
        rimg = Image.new("RGBA", (512, 512), clr)
        rimg.paste(local_image, (opt2_w, opt2_h),  local_image)
        if sim_suf == False:
            img_suf += 1
        if no_gen == True:
            rimg.save(path_dir + "\\" + "r_" + image_name + "_" + str(img_suf) + ".png")
        else:
            rimg.save(path_dir + "\\" + "c_" + image_name + "_" + str(img_suf) + ".png")
        new_w, new_h = int(w * dw), int(h * dh)
        w_opt, h_opt = int(w_opt * pd), int(h_opt * pd)
        if is_w_bigger == True:
            h_opt -= opt2_h
        else:
            w_opt -= opt2_w
    else:
        if need_crop == False:
            rimg = local_image
        else:
            local_image.close()
    buf = io.BytesIO()
    rimg.save(buf, format = "PNG")
    rimg.close()
    binary_data =  buf.getvalue()
    if need_crop == True:
        return [clr, new_w, new_h, w_opt, h_opt], binary_data
    return False, binary_data

def Restore_Image(bd, rbuf, path, restore_file_name):
    with open(path + "\\c_" + restore_file_name + "_restore.json", 'w') as f:
        f.write(json.dumps(rbuf))
    limg = Image.open(io.BytesIO(bd)).convert("RGBA")
    rimg = Image.new("RGBA", (rbuf[1], rbuf[2]), (rbuf[0][0], rbuf[0][1], rbuf[0][2], rbuf[0][3]))
    rimg.paste(limg, (rbuf[3], rbuf[4]), limg)
    buf = io.BytesIO()
    rimg.save(buf, format = "PNG")
    rimg.save(path + "\\r_" + restore_file_name + ".png")
    limg.close()
    rimg.close()
    return buf.getvalue()

async def neural_processing(process, nprocess):
    if nprocess == True:
        return
    while process:
        nprocess = True
        if len(task_list) != 0:
            task = task_list.pop(0)
            websocket = task[0]
            task_type = task[1]
            img_suf = task[3]
            task_id = task[4]
            user_id = task[5]
            chain_id = task[6]
            #await websocket.send(json.dumps({'0' : "t", '1' : "Обработка началась"})) #костыль
            path_to_task_dir = "log\\" + user_id + "\\" + task_id
            if task_type != 't': #если в обработку передаётся изображение
                orig_img_name = task[2]
                img_name = orig_img_name + "_" + str(img_suf)
                if img_name[0] == 'c' and img_name[1] == '_':
                    need_restore = True
                    new_img_name = ""
                    with open(path_to_task_dir + "\\" + img_name + "_restore.json", 'r') as f:
                        rbufer = json.loads(f.read())
                    with open(path_to_task_dir + "\\" + img_name + ".png", "rb") as f:
                        binary_data = f.read()
                elif os.path.exists(path_to_task_dir + "\\c_" + img_name + ".png"):
                    new_img_name = "c_"
                    need_restore = True
                    with open(path_to_task_dir + "\\c_" + img_name + "_restore.json", 'r') as f:
                        rbufer = json.loads(f.read())
                    with open(path_to_task_dir + "\\c_" + img_name + ".png", "rb") as f:
                        binary_data = f.read()
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": ("c_" + img_name + ".png", binary_data) })
                elif task_type == 'p' or task_type == 'c':
                    if task_type == 'c':
                        rbufer, binary_data = Prepare_img(path_to_task_dir, orig_img_name, img_suf, False, False)
                        img_name = orig_img_name + "_" + str(img_suf + 1)
                    else:
                        rbufer, binary_data = Prepare_img(path_to_task_dir, orig_img_name, img_suf, False, True)
                    if rbufer != True and rbufer != False:
                        new_img_name = "c_"
                        need_restore = True
                    else:
                        new_img_name = ""
                        need_restore = False
                else:
                    new_img_name = ""
                    need_restore = False
                img_name = new_img_name + img_name + ".png"
            img_suf += 1

            if task_type == 'c': #если нужно сгенерировать описание
                new_img_name += orig_img_name
                need_translate = task[7]
                noback = task[8]
                if rbufer == True: #если это просто одноцветный фон, то выдать описание "solid color background"
                    client_message = "solid color background"
                else:
                    message_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (img_name, binary_data) })
                    params = {
                        "eval_cider": False,       #использовать эволюционную CIDEr метрику 
                        "beam": 5,                 #балансировка
                        "max_len_b": 16,           #максимальная длина буфера
                        "no_repeat_ngram_size": 3, #не повторять N-граммы размера
                        "seed": 7                  #инициализирующее значение (для воспроизводимой генерации подписей)
                    }
                    client_message = await Gen_caption(websocket, path_to_task_dir, img_name, params)
                    client_message, chain_id = del_prompt_about_drawing(client_message, message_id, noback)
                    with open(path_to_task_dir + "/AI_caption_" + str(img_suf) + ".txt", "w") as f:
                        f.write(client_message)
                chain_id = send_message_to_tg(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id)
                if need_translate == True:
                    translator = Translator()
                    client_message = translator.translate(client_message, src = "en", dest = dest_lang).text.replace(" -", "-")
                    with open(path_to_task_dir + "/AI_caption_ru_" + str(img_suf) + ".txt", "w") as f:
                        f.write(client_message)
                    time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                    chain_id = send_message_to_tg(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id)
                if need_restore == True: #если нужно восстановление
                    with open(path_to_task_dir + "\\c_" + orig_img_name + "_" + str(img_suf) + "_restore.json", 'w') as f:
                        f.write(json.dumps(rbufer))
                resp_data = {
                    '0': 'c',
                    '1': task_id,
                    '2': client_message,
                    '3': chain_id,
                    '4': new_img_name,
                    '5': img_suf
                }

            elif task_type == 'p': #если нужно сгенерировать изображение по изображению
                local_img_name = "picture"
                new_img_name += local_img_name
                is_SD2 = task[7]
                AI_prompt = task[8]
                postview = str(base64.b64encode(binary_data).decode('utf-8'))   
                message_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": (img_name, binary_data)})
                if is_SD2 == False:
                    params = {
                        'ddim_steps': 50,             #количество шагов выборки ddim
                        'ddim_eta': 0.0,              #ddim η (η = 0.0 соответствует детерминированной выборке)
                        'C': 4,                       #латентные каналы
                        'f': 8,                       #коэффициент понижающей дискретизации, чаще всего 8 или 16
                        'scale': 5.0,                 #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
                        'strength': 0.7,              #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
                        'ckpt': 0,                    #выбор контрольной точки модели (от 0 до 9)
                        'seed': 42,                   #сид (для воспроизводимой генерации изображений)
                        'precision': "autocast"       #оценивать с этой точностью ("full" или "autocast")
                    }
                    w, h, binary_data = await Stable_diffusion(websocket, path_to_task_dir, img_name, img_suf, need_restore, AI_prompt, params) #передаю сокет, путь к рабочей папке, имя файла, true если AI описание, false если человеческая
                else:
                    params = {
                        'ddim_steps': 50,             #количество шагов выборки ddim
                        'ddim_eta': 0.0,              #ddim η (η = 0.0 соответствует детерминированной выборке)
                        'C': 4,                       #латентные каналы
                        'f': 8,                       #коэффициент понижающей дискретизации, чаще всего 8 или 16
                        'scale': 9.0,                 #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
                        'strength': 0.7,              #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
                        'ckpt': 0,                    #выбор контрольной точки модели (от 0 до 9)
                        'seed': 42,                   #сид (для воспроизводимой генерации изображений)
                        'precision': "autocast"       #оценивать с этой точностью ("full" или "autocast")
                    }
                    w, h, binary_data = await Stable_diffusion_2(websocket, path_to_task_dir, img_name, img_suf, need_restore, AI_prompt, params) #передаю сокет, путь к рабочей папке, имя файла, и true если AI описание, false если человеческая
                result_img = local_img_name + "_" + str(img_suf)
                if need_restore == True: #если нужно восстановление
                    with open(path_to_task_dir + "\\c_" + result_img, "wb") as f:
                        f.write(binary_data)
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (result_img + ".png", binary_data) })
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name,
                    '6': task_id,
                    '7': postview,
                    '8': img_suf
                }

            elif task_type == 'f': #если нужно удалить фон у изображения
                local_img_name = "object"
                new_img_name += local_img_name
                with open(path_to_task_dir + "\\" + img_name, "rb") as f:
                    postview = str(base64.b64encode(f.read()).decode("utf-8"))
                w, h, binary_data = Delete_background(path_to_task_dir, img_name, img_suf, need_restore) #передаю путь к рабочей папке и имя файла
                result_img = local_img_name + "_" + str(img_suf)
                if need_restore == True: #если нужно восстановление
                    with open(path_to_task_dir + "\\c_" + result_img, "wb") as f:
                        f.write(binary_data)
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    rbufer[0] = (0, 0, 0, 0)
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": (result_img + ".png", binary_data)})
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name,
                    '6': task_id,
                    '7': postview,
                    '8': img_suf
                }

            elif task_type == 'a': #если нужно апскейлить изображение
                local_img_name = "big_image"
                new_img_name += local_img_name
                params = {
                    "model": 0,                         #Номер модели для обработки (0-5)
                    "denoise_strength": 0.5,            #Сила удаления шума. 0 для слабого удаления шума (шум сохраняется), 1 для сильного удаления шума. Используется только для модели 5 (realesr-general-x4v3 model)
                    "outscale": 4,                      #Величина того, во сколько раз увеличть разшрешение изображения
                    "tile": 0,                          #Размер плитки, 0 для отсутствия плитки во время тестирования
                    "tile_pad": 10,                     #Заполнение плитки
                    "pre_pad": 0,                       #Предварительный размер заполнения на каждой границе
                    "face_enhance": True,               #Использовать GFPGAN улучшения лиц
                    "fp32": True,                       #Использовать точность fp32 во время вывода. По умолчанию fp16 (половинная точность)
                    "alpha_upsampler": "realesrgan",    #Апсемплер для альфа-каналов. Варианты: realesrgan | bicubic
                    "gpu-id": None                      #Устройство gpu для использования (по умолчанию = None) может быть 0, 1, 2 для обработки на нескольких GPU
                }
                outscale = params["outscale"]
                w, h, binary_data = Upscale(path_to_task_dir, img_name, img_suf, need_restore, params) #передаю путь к рабочей папке
                result_img = local_img_name + "_" + str(img_suf)
                if need_restore == True: #если нужно восстановление
                    with open(path_to_task_dir + "\\c_" + result_img, "wb") as f:
                        f.write(binary_data)
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    rbufer[1] *= outscale
                    rbufer[2] *= outscale
                    rbufer[3] *= outscale
                    rbufer[4] *= outscale
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (result_img + ".png", binary_data) })
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name,
                    '6': task_id,
                    '7': "",
                    '8': img_suf
                }

            if task_type == 't': #если нужно сгенерировать изображение по описанию
                local_img_name = "tpicture"
                caption = task[2]
                is_SD2 = task[7]
                if is_SD2 == True:
                    params = {
                        "steps": 50,            #количество шагов выборки
                        "plms": True,           #использовать выборку plms
                        "dpm": True,            #использовать выборку DPM (2)
                        "ddim_eta": 0.0,        #ddim η (η = 0.0 соответствует детерминированной выборке)
                        "C": 4,                 #латентные каналы
                        "f": 8,                 #коэффициент понижающей дискретизации, чаще всего 8 или 16
                        "scale": 9.0,           #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
                        "ckpt": 0,              #выбор контрольной точки модели (0 или 1 для размерностей 512 или 768 соответственно)
                        "seed": 42,             #сид (для воспроизводимой генерации изображений)
                        "precision": "autocast" #оценивать с этой точностью ("full" или "autocast")
                    }
                    w, h, binary_data = await Stable_diffusion_2_text_to_image(websocket, path_to_task_dir, caption, params) #передаю сокет, путь к рабочей папке, имя файла и параметры генерации
                else:
                    params = {
                        "verbose": True,            #Печатать подробный вывод
                        "suppress_updates": False,  #Подавить обновление моделей, если контрольные суммы не совпадают
                        "decoder-batch-size": 10,   #Размер набора для декодера
                    }
                    w, h, binary_data = await Dall_e_2_text_to_image(websocket, path_to_task_dir, caption, params) #передаю сокет, путь к рабочей папке, имя файла и параметры генерации
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {'document': ('drawing.png', binary_data)})
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': local_img_name,
                    '6': task_id,
                    '7': "",
                    '8': "1"
                }

            await websocket.send(json.dumps(resp_data))
        else:
            process = False
            nprocess = False

def build_connection(ws, u_id, istask):
    user_path = "log/" + u_id
    if os.path.isdir(user_path):
        if istask:
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
                if limit == -1:
                    resp_data = {
                        '0' : "t",
                        '1' : "У вас не осталось попыток на сегодня. Подождите " + str(86400 - wait_time) + " секунд, чтобы продолжить, либо оформите платную подписку на сервис"
                    }
                    ws.send(json.dumps(resp_data))
                    ws.close()
                    return False
    else:
        os.mkdir(user_path)
        with open(user_path + "/limit.txt", "w") as f:
            limit = 25
            if istask:
                limit = 24
            f.write(limit)
    return user_path

async def handler(websocket):
    try:
        while True:
            try:
                jsonData = await websocket.recv()
            except:
                try:
                    task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))
                except:
                    print("Клиент слишком рано разорвал соединение")
                break
            dictData = json.loads(jsonData)
            istask = True
            if(dictData["type"] == "s"): #если настройки
                istask = False
            user_path = build_connection(websocket, user_id, istask)
            if user_path == False:
                return

            if(dictData["type"] == "d"): #нужно описание
                if dictData["chain_id"] == "":
                    binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                    pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                    (w, h) = pillow_img.size
                    if dictData["backgroung"] == "":
                        noback = True
                        background_img = Image.new('RGBA', (w, h), (255, 255, 255))
                    else:
                        print("\nback")
                        noback = False
                        binary_data2 = base64.b64decode(bytes(dictData["backgroung"][22:], 'utf-8'))
                        background_img = Image.open(io.BytesIO(binary_data2)).convert("RGBA").resize((w, h))
                    drawing_img = background_img
                    drawing_img.paste(pillow_img, (0,0),  pillow_img)
                    buf = io.BytesIO()
                    drawing_img.save(buf, format = 'PNG')
                    result_binary_data = buf.getvalue()
                    message_id = send_document_to_tg(URL + "sendDocument?chat_id=" + chat_id, {"document": ("drawing.png", result_binary_data)})
                    task_dir = user_path + "/" + message_id
                    os.mkdir(task_dir)
                    with open(task_dir + "/drawing_0.png", "wb") as f:
                        f.write(result_binary_data)

                    with open(task_dir + "/drawing_info_0.txt", "w") as f:#сбор статистики по рисунку
                        if dictData["is_drawing"]:
                            f.write("1\n")
                        else:
                            f.write("0\n")
                        if dictData["sure"]:
                            f.write("1\n")
                        else:
                            f.write("0\n")
                        f.write(str(dictData["prims_count"]) + "\n")
                        f.write(str(dictData["dots_count"]))

                    if noback == False:
                        with open(task_dir + "/background_0.png", "wb") as f:
                            f.write(binary_data2)
                        with open(task_dir + "/foreground_0.png", "wb") as f:
                            f.write(binary_data)
                    task_id = message_id
                    img_name = "drawing"
                    img_suf = 0
                else:
                    noback = False
                    message_id = dictData["chain_id"]
                    task_id = dictData["task_id"]
                    img_name = dictData["img_name"]
                    img_suf = int(dictData["img_suf"])
                task_list.append([websocket, 'c', img_name, img_suf, task_id, user_id, message_id, need_translate, noback]) #нужно описание
            
            elif dictData["type"] == "hg1" or dictData["type"] == "hg2" or dictData["type"] == "g1" or dictData["type"] == "g2": #нужна картина по описанию
                if dictData["type"] == "g1" or dictData["type"] == "g2": #по машинному описанию
                    img_name = dictData["img_name"]
                    img_suf = int(dictData["img_suf"])
                    task_id = dictData["task_id"]
                    message_id = dictData["chain_id"]
                    AI_prompt = True
                    if dictData["type"] == "g1":
                        is_SD2 = False
                    else:
                        is_SD2 = True
                else: #по человеческому описанию
                    AI_prompt = False
                    if dictData["type"] == "hg1":
                        is_SD2 = False
                    else:
                        is_SD2 = True
                    if dictData["chain_id"] == "":
                        binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                        pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                        (w, h) = pillow_img.size
                        if dictData["backgroung"] == "":
                            noback = True
                            background_img = Image.new('RGBA', (w, h), (255, 255, 255))
                        else:
                            print("\nback")
                            noback = False
                            binary_data2 = base64.b64decode(bytes(dictData["backgroung"][22:], 'utf-8'))
                            background_img = Image.open(io.BytesIO(binary_data2)).convert("RGBA")
                            background_img = background_img.resize((w, h))
                        drawing_img = background_img
                        drawing_img.paste(pillow_img, (0, 0),  pillow_img)
                        buf = io.BytesIO()
                        drawing_img.save(buf, format = 'PNG')
                        result_binary_data = buf.getvalue()
                        task_id = send_document_to_tg(URL + "sendDocument?caption=" + dictData["prompt"] + "&chat_id=" + chat_id, {"document": ("drawing_0.png", result_binary_data)})
                        task_dir = user_path + "/" + task_id
                        os.mkdir(task_dir)
                        with open(task_dir + "/drawing_0.png", "wb") as f:
                            f.write(result_binary_data)

                        with open(task_dir + "/drawing_info_0.txt", "w") as f:#сбор статистики по рисунку
                            if dictData["is_drawing"]:
                                f.write("1\n")
                            else:
                                f.write("0\n")
                            if dictData["sure"]:
                                f.write("1\n")
                            else:
                                f.write("0\n")
                            f.write(str(dictData["prims_count"]) + "\n")
                            f.write(str(dictData["dots_count"]))

                        if noback == False:
                            with open(task_dir + "/background_0.png", "wb") as f:
                                f.write(binary_data2)
                            with open(task_dir + "/foreground_0.png", "wb") as f:
                                f.write(binary_data)
                        img_name = "drawing"
                        img_suf = 0
                        need_make_text_file = True
                    else:
                        if not os.path.exists(task_dir + "/Human_caption_0.txt"):
                            need_make_text_file = True
                            message_id = send_message_to_tg(URL + "sendMessage?text=" + dictData["prompt"] + "&reply_to_message_id=" + dictData["chain_id"] + "&chat_id=" + chat_id)
                            time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                        else:
                            need_make_text_file = False
                            message_id = dictData["chain_id"]
                        task_id = dictData["task_id"]
                        img_name = dictData["img_name"]
                        img_suf = int(dictData["img_suf"])
                    if need_make_text_file:
                        translator = Translator()
                        lang = translator.detect(dictData["prompt"]).lang
                        if lang != "en":
                            with open(task_dir + "/Human_caption_ru_" + str(img_suf) + ".txt", "w") as f:
                                f.write(dictData["prompt"])
                            time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                            result_text = translator.translate(dictData["prompt"], src = lang, dest = "en").text.replace(" -", "-")
                            message_id = send_message_to_tg(URL + "sendMessage?text=" + result_text + "&reply_to_message_id=" + task_id + "&chat_id=" + chat_id)
                        else:
                            result_text = dictData["prompt"]
                            message_id = task_id
                        with open(task_dir + "/Human_caption_" + str(img_suf) + ".txt", "w") as f:
                            f.write(result_text)
                task_list.append([websocket, "p", img_name, img_suf, task_id, user_id, message_id, is_SD2, AI_prompt]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ
            
            elif(dictData["type"] == "b"): #нужно удалить фон у изображения
                if dictData["chain_id"] == "":
                    binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                    pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                    buf = io.BytesIO()
                    pillow_img.save(buf, format = 'PNG')
                    result_binary_data = buf.getvalue()
                    message_id = send_document_to_tg(URL + "sendDocument?caption=Изображение для удаления фона&chat_id=" + chat_id, {'document': ('drawing.png', result_binary_data)})
                    task_id = message_id
                    task_dir = user_path + "/" + message_id
                    os.mkdir(task_dir)

                    with open(task_dir + "/picture_0.png", "wb") as f:
                        f.write(result_binary_data)
                    img_name = "picture"
                    img_suf = 0
                else:
                    message_id = dictData["chain_id"]
                    task_id = dictData["task_id"]
                    img_name = dictData["img_name"]
                    img_suf = int(dictData["img_suf"])
                task_list.append([websocket, "f", img_name, img_suf, task_id, user_id, message_id]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения
            
            elif(dictData["type"] == "a"): #нужно апскейлить изображение
                if dictData["chain_id"] == "":
                    binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                    pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                    buf = io.BytesIO()
                    pillow_img.save(buf, format = 'PNG')
                    result_binary_data = buf.getvalue()
                    message_id = send_document_to_tg(URL + "sendDocument?caption=Изображение для апскейлинга&chat_id=" + chat_id, { "document": ('drawing.png', result_binary_data)})
                    task_id = message_id
                    task_dir = user_path + "/" + message_id
                    os.mkdir(task_dir)
                    with open(task_dir + "/picture_0.png", "wb") as f:
                        f.write(result_binary_data)
                    img_name = "picture"
                    img_suf = 0
                else:
                    message_id = dictData["chain_id"]
                    task_id = dictData["task_id"]
                    img_name = dictData["img_name"]
                    img_suf = int(dictData["img_suf"])
                task_list.append([websocket, "a", img_name, img_suf, task_id, user_id, message_id]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения
            
            elif(dictData["type"] == "ts" or dictData["type"] == "td"): #нужно сгенерировать изображение по описанию
                if dictData["type"] == "ts":
                    is_SD2 = True
                else:
                    is_SD2 = False
                prompt = dictData["prompt"]
                task_id = send_message_to_tg(URL + "sendMessage?text=" + prompt + "&chat_id=" + chat_id)
                translator = Translator()
                lang = translator.detect(prompt).lang
                if lang != "en":
                    time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                    result_text = translator.translate(prompt, src = lang, dest = "en").text.replace(" -", "-")
                    message_id = send_message_to_tg(URL + "sendMessage?text=" + result_text + "&reply_to_message_id=" + task_id + "&chat_id=" + chat_id)
                else:
                    message_id = task_id
                    result_text = prompt
                task_dir = user_path + "\\" + task_id
                os.mkdir(task_dir)
                with open(task_dir + "\\Human_caption_0.txt", "w") as f:
                    f.write(result_text)
                img_suf = 0
                task_list.append([websocket, "t", result_text, img_suf, task_id, user_id, message_id, is_SD2]) #дескриптор сокета, тип задания, текст описания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, Использовать ли SD2, или Dall-e 2
            
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
    finally:
        print("Соединение разорвано со стороны пользователя")
        task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain("domain_name.crt", "private.key")
    start_server = websockets.serve(handler, "stabledraw.com", 8081, ssl = ssl_context, max_size = None)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()