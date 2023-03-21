﻿import io
import os
import ssl
import cv2
import json
import time
import numpy
import base64
import asyncio
import requests
import websockets
from PIL import Image
from googletrans import Translator
from Image_caption_generator import Gen_caption
from Delete_background import Delete_background
from Upscaler import Upscale
from Stable_diffusion import Stable_diffusion_image_to_image
from Stable_diffusion import Stable_diffusion_text_to_image
from Stable_diffusion import Stable_diffusion_depth_to_image
from Stable_diffusion import Stable_diffusion_inpainting
from Stable_diffusion import Stable_diffusion_upscaler
from Stable_diffusion import Stable_diffusion_upscaler_xX
from Image_classifier import Get_image_class
from Image_сolorization import Image_сolorizer

chat_id = "-1001661093241"

with open("token.txt", "r") as f:
    TOKEN = f.read()

URL = "https://api.telegram.org/bot{}/".format(TOKEN)

task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id

user_id = "0" #Пока что мы не знаем id (убрать)

process = False
nprocess = False

settings = {
    "autotranslate": True,          #переводить автоматически
    "dest_lang": "ru",              #язык, на который переводить
    "autoclass": True,              #классифицировать автоматически
    "autofaceenchance": True,       #улучшать лица, если классификатор определил как фото лица
    "autoproclr": True,             #раскрашивать автоматически, если классификатор определил как профессиональный лайн
    "autoquickclr": True,           #раскрашивать автоматически, если классификатор определил как быстрый лайн
    "autophotofacepreset": True,    #автоматически устанавливать пресет настроек для обработки фотографий, если классификатор определил как фото с лицом
    "autophotonofacepreset": True,  #автоматически устанавливать пресет настроек для обработки фотографий, если классификатор определил как фото без лица
    "autoproartpreset": True,       #автоматически устанавливать пресет настроек для обработки профессионального рисунка, если классификатор определил как профессиональный рисунок
    "autonoproartpreset": True      #автоматически устанавливать пресет настроек для обработки непрофессионального рисунка, если классификатор определил как непрофессиональный рисунок
    }

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

def Prepare_img(path_dir, image_name, img_suf, no_gen, sim_suf, no_resize):
    frame_size = 10
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
                    binary_data = buf.getvalue()
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
        if no_resize:
            opt2_w, opt2_h = int(w * frame_size / 512), int(h * frame_size / 512)
            new_w, new_h = w + (opt2_w * 2), h + (opt2_h * 2)
            pd = 1
        else:
            new_w, new_h = 512, 512
            if w > h:
                pd = 512 / w
                h = int((512 - (frame_size * 2)) * h / w)
                w = 512 - (frame_size * 2)
                opt2_w = frame_size
                opt2_h = int((512 - h) / 2)
                is_w_bigger = True
            else:
                pd = 512 / h
                w = int(512 - (frame_size * 2) * w / h)
                h = 512 - (frame_size * 2)
                opt2_h = frame_size
                opt2_w = int((512 - w) / 2)
                is_w_bigger = False
            local_image = local_image.resize((w, h), resample = Image.Resampling.LANCZOS).convert("RGBA")
        rimg = Image.new("RGBA", (new_w, new_h), clr)
        rimg.paste(local_image, (opt2_w, opt2_h),  local_image)
        if sim_suf == False:
            img_suf += 1
        if no_gen == True:
            rimg.save(path_dir + "\\" + "r_" + image_name + "_" + str(img_suf) + ".png")
        else:
            rimg.save(path_dir + "\\" + "c_" + image_name + "_" + str(img_suf) + ".png")
        new_w, new_h = int(w * dw), int(h * dh)
        w_opt, h_opt = int(w_opt * pd), int(h_opt * pd)
        if no_resize == False:
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

def make_mask(img, path_to_save):
    img_array = numpy.array(img)
    img_array = cv2.cvtColor(img_array, cv2.COLOR_RGB2RGBA)
    w, h = img.size
    A_img_array = numpy.zeros((h, w, 3), dtype = numpy.uint8)
    A_img_array[:, :, 0] = img_array[:, :, 3]
    A_img_array[:, :, 1] = img_array[:, :, 3]
    A_img_array[:, :, 2] = img_array[:, :, 3]
    cv2.imwrite(path_to_save, A_img_array)
    im_buf_arr = cv2.imencode(".png", A_img_array)[1]
    b_data = im_buf_arr.tobytes()
    return b_data

def colorize(init_img_binary_data):
    params = {
        "ckpt": 0,                         #Выбор модели (от 0 до 3)
        "steps": 1,                        #Количество шагов обработки (минимум 1)
        "compare": False,                  #Сравнивать с оригиналом
        "stats": ([0.7137, 0.6628, 0.6519], [0.2970, 0.3017, 0.2979]), #Инициализирующие веса
        "artistic": True,                  #Дополнительная модель для обработки
        "render_factor": 12,               #Фактор обработки (от 7 до 45) (лучше 12)
        "post_process": True,              #Постобработка
        "clr_saturation_factor": 5,        #Коэффициент увеличения цветовой насыщенности (0 - не добавлять насыщенность)
        "line_color_limit": 50,            #минимальная яркость пикселя, при которой цветовая насыщенность увеличиваться не будет (меньше для цифровых рисунков, больше для рисунков карандашом. 1 если лайн абсолютно чёрный)
        "clr_saturate_every_step": True    #Повышать цветовую насыщенность после каждого шага (играет роль только если количество шагов обработки больше 1)
    }


    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autophotonofacepreset"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autoproclr"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autoproclr"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autoquickclr"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autoproartpreset"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True
    elif settings["autonoproartpreset"] == True:
        params["steps"] = 1
        params["ckpt"] = 0
        params["compare"] = False
        params["artistic"] = True
        params["render_factor"] = 12
        params["post_process"] = True
        params["clr_saturation_factor"] = 5
        params["line_color_limit"] = 50
        params["clr_saturate_every_step"] = True

    return Image_сolorizer(init_img_binary_data, params) #передаю путь к рабочей папке и имя файла

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
            final_file_name = task[7]
            init_img_binary_data = None
            postview = None
            print("Обработка началась")
            path_to_task_dir = "log\\" + user_id + "\\" + task_id
            if task_type != 't': #если в обработку передаётся изображение
                orig_img_name = task[2]
                img_name = orig_img_name + "_" + str(img_suf)
                if img_name[0] == 'c' and img_name[1] == '_':
                    need_restore = True
                    new_img_name = ""
                    if task_type == 'p' and task[10] == True:
                        if img_suf != 0:
                            new_img_suf = img_suf - 1
                        else:
                            new_img_suf = 0
                        rbufer, init_img_binary_data = Prepare_img(path_to_task_dir, orig_img_name[2:], new_img_suf, False, False, True)
                        img_name = orig_img_name + "_" + str(img_suf)
                    else:
                        with open(path_to_task_dir + "\\" + img_name + "_restore.json", 'r') as f:
                            rbufer = json.loads(f.read())

                        if img_suf == 0:
                            img_name = img_name[:-1] + "1"
                            img_suf == 1


                        with open(path_to_task_dir + "\\" + img_name + ".png", "rb") as f:
                            init_img_binary_data = f.read()
                elif os.path.exists(path_to_task_dir + "\\c_" + img_name + ".png"):
                    new_img_name = "c_"
                    need_restore = True
                    with open(path_to_task_dir + "\\c_" + img_name + "_restore.json", 'r') as f:
                        rbufer = json.loads(f.read())
                    with open(path_to_task_dir + "\\c_" + img_name + ".png", "rb") as f:
                        init_img_binary_data = f.read()
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": ("c_" + img_name + ".png", init_img_binary_data) })
                elif task_type == 'p' or task_type == 'c':
                    if task_type == 'c':
                        rbufer, init_img_binary_data = Prepare_img(path_to_task_dir, orig_img_name, img_suf, False, False, False)
                        if rbufer != True or rbufer != False:
                            img_suf -= 1
                        img_name = orig_img_name + "_" + str(img_suf + 1)
                    else:
                        rbufer, init_img_binary_data = Prepare_img(path_to_task_dir, orig_img_name, img_suf, False, True, False)
                    if rbufer != True and rbufer != False:
                        new_img_name = "c_"
                        need_restore = True
                    else:
                        new_img_name = ""
                        need_restore = False
                else:
                    with open(path_to_task_dir + "\\" + img_name + ".png", "rb") as f:
                        init_img_binary_data = f.read()
                    new_img_name = ""
                    need_restore = False
                img_name = new_img_name + img_name + ".png"
            img_suf += 1

            image_class = -1
            if init_img_binary_data != None and settings["autoclass"] == True:
                image_class = Get_image_class(init_img_binary_data)
                classes = [
                    "фото с лицом",
                    "фото без лица",
                    "профессиональный рисунок",
                    "непрофессиональный рисунок",
                    "профессиональный лайн",
                    "быстрый лайн"
                ]
                chain_id = send_message_to_tg(URL + "sendMessage?text=" + "Определён класс: " + classes[image_class] + "&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id)
                if (not task_type in ['f', 'a', '0']) and (settings["autoproclr"] == True and image_class == 4) or (settings["autoquickclr"] == True and image_class == 5):
                    postview = str(base64.b64encode(init_img_binary_data).decode("utf-8"))
                    init_img_binary_data = colorize(init_img_binary_data)
                    result_img = "colored_" + str(img_suf)
                    img_suf += 1
                    with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                        f.write(binary_data)
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (result_img + ".png", init_img_binary_data) })

            if task_type == 'c': #если нужно сгенерировать описание
                noback = task[8]
                if rbufer == True: #если это просто одноцветный фон, то выдать описание "solid color background"
                    english_caption = "solid color background"
                else:
                    message_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (img_name, init_img_binary_data) })
                    params = {
                        "ckpt": "caption_huge_best.pt", #используемые чекпоинты (caption_huge_best.pt или caption_base_best.pt) #https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt
                        "eval_cider": True,             #оценка с помощью баллов CIDEr
                        "eval_bleu": False,             #оценка с помощью баллов BLEU
                        "eval_args": "{}",              #аргументы генерации для оценки BLUE или CIDEr, например, "{"beam": 4, "lenpen": 0,6}", в виде строки JSON
                        "eval_print_samples": False,    #печатать поколения образцов во время валидации
                        "scst": False,                  #Обучение самокритичной последовательности
                        "scst_args": "{}",              #аргументы генерации для обучения самокритичной последовательности в виде строки JSON
                        "beam": 5,                      #балансировка
                        "max_len_a": 0,                 #максимальная длина буфера a
                        "max_len_b": 200,               #максимальная длина буфера b
                        "min_len": 1,                   #минимальная длина буфера
                        "unnormalized": False,          #ненормализовывать
                        "lenpen": 1,
                        "unkpen": 0,
                        "temperature": 1.0,             #температура
                        "match_source_len": False,      #сопоставлять с исходной длиной
                        "no_repeat_ngram_size": 3,      #не повторять N-граммы размера
                        "sampling_topk": 3,             #из скольки тоненов отбирать лучший (0 - не использовать сэмплирование)
                        "seed": 7                       #инициализирующее значение для генерации
                    }
                    english_caption = Gen_caption(init_img_binary_data, params)
                    english_caption, chain_id = del_prompt_about_drawing(english_caption, message_id, noback)
                    with open(path_to_task_dir + "\\" + final_file_name + "_" + str(img_suf) + ".txt", "w") as f:
                        f.write(english_caption)
                chain_id = send_message_to_tg(URL + "sendMessage?text=" + english_caption + "&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id)
                if settings["autotranslate"] == True:
                    translator = Translator()
                    caption = translator.translate(english_caption, src = "en", dest = settings["dest_lang"]).text.replace(" -", "-")
                    with open(path_to_task_dir + "\\" + final_file_name + "_ru_" + str(img_suf) + ".txt", "w") as f:
                        f.write(caption)
                    time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                    chain_id = send_message_to_tg(URL + "sendMessage?text=" + caption + "&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id)
                else:
                    caption = english_caption
                if need_restore == True: #если нужно восстановление
                    with open(path_to_task_dir + "\\c_" + orig_img_name + "_" + str(img_suf) + "_restore.json", 'w') as f:
                        f.write(json.dumps(rbufer))
                resp_data = {
                    '0': 'c',
                    '1': task_id,
                    '2': caption,
                    '3': chain_id,
                    '4': new_img_name + orig_img_name,
                    '5': img_suf,
                    '6': english_caption
                }

            elif task_type == 'p': #если нужно сгенерировать изображение по изображению
                caption = task[8]
                Is_depth = task[9]
                Is_inpainting = task[10]
                Is_upscale = task[11]
                Is_upscale_xX = task[12]
                mask_binary_data = task[13]
                postview = str(base64.b64encode(init_img_binary_data).decode('utf-8'))
                message_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": (img_name, init_img_binary_data)})
                if Is_depth == True:
                    params = {
                        "ddim_steps": 50,           #Шаги DDIM, от 0 до 50
                        "ddim_eta": 0.0,            #ddim η (η = 0.0 соответствует детерминированной выборке)
                        "scale": 9.0,               #от 0.1 до 30.0
                        "strength": 0.9,            #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
                        "ckpt": 0,                  #выбор весов модели (0)
                        "seed": 42,                 #от 0 до 1000000
                        "model_type": "dpt_hybrid", #тип модели
                        "verbose": True,
                        "max_dim": pow(512, 2)      # я не могу генерировать на своей видюхе картинки больше 512 на 512
                    }


                    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autophotonofacepreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoquickclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autonoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9


                    w, h, binary_data = Stable_diffusion_depth_to_image(init_img_binary_data, caption, params) #передаю сокет, путь к рабочей папке, имя файла, и true если AI описание, false если человеческая
                elif Is_inpainting:
                    params = {
                        "ddim_steps": 50,           #Шаги DDIM, от 0 до 50
                        "ddim_eta": 0.0,            #значения от 0.0 до 1.0, η = 0.0 соответствует детерминированной выборке
                        "scale": 10.0,              #от 0.1 до 30.0
                        "strength": 0.9,            #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
                        "ckpt": 0,                  #выбор весов модели (0)
                        "seed": 42,                 #от 0 до 1000000
                        "verbose": False,
                        "max_dim": pow(512, 2)  # я не могу генерировать на своей видюхе картинки больше 512 на 512
                    }


                    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autophotonofacepreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoquickclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9
                    elif settings["autonoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 10.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.9


                    w, h, binary_data = Stable_diffusion_inpainting(init_img_binary_data, mask_binary_data, caption, params) #передаю сокет, путь к рабочей папке, имя файла и параметры
                elif Is_upscale == True:
                    params = {
                        "ddim_steps": 50,           #Шаги DDIM, от 2 до 250
                        "ddim_eta": 0.0,            #значения от 0.0 до 1.0, η = 0.0 соответствует детерминированной выборке
                        "scale": 9.0,               #от 0.1 до 30.0
                        "ckpt": 0,                  #выбор весов модели (0)
                        "seed": 42,                 #от 0 до 1000000
                        "outscale": 4,              #Величина того, во сколько раз увеличть разшрешение изображения
                        "noise_augmentation": 20,   #от 0 до 350
                        "negative_prompt": None,    #отрицательное описание (если без него, то None)
                        "verbose": False,
                        "max_dim": pow(512, 2)      # я не могу генерировать на своей видюхе картинки больше 256 на 256 для x4 и 512 на 512 для x2
                    }


                    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autophotonofacepreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autoquickclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20
                    elif settings["autonoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 20


                    outscale = params["outscale"]
                    if need_restore:
                        rbufer[1] *= outscale
                        rbufer[2] *= outscale
                        rbufer[3] *= outscale
                        rbufer[4] *= outscale
                    w, h, binary_data = Stable_diffusion_upscaler(init_img_binary_data, caption, params) #передаю сокет, путь к рабочей папке, имя файла, и true если AI описание, false если человеческая
                elif Is_upscale_xX == True:
                    params = {
                        "ddim_steps": 20,           #Шаги DDIM, от 2 до 250
                        "ddim_eta": 0.0,            #значения от 0.0 до 1.0, η = 0.0 соответствует детерминированной выборке
                        "scale": 9.0,               #от 0.1 до 30.0
                        "ckpt": 0,                  #выбор весов модели (0)
                        "seed": 42,                 #от 0 до 1000000
                        "outscale": 2,              #Величина того, во сколько раз увеличть разшрешение изображения
                        "noise_augmentation": 0.0,   #от 0 до 350
                        "negative_prompt": None,    #отрицательное описание (если без него, то None)
                        "verbose": False,
                        "max_dim": pow(512, 2)      # я не могу генерировать на своей видюхе картинки больше 256 на 256 для x4 и 512 на 512 для x2
                    }


                    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autophotonofacepreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autoquickclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0
                    elif settings["autonoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["noise_augmentation"] = 0.0


                    outscale = params["outscale"]
                    if need_restore:
                        rbufer[1] *= outscale
                        rbufer[2] *= outscale
                        rbufer[3] *= outscale
                        rbufer[4] *= outscale
                    w, h, binary_data = Stable_diffusion_upscaler_xX(init_img_binary_data, caption, params) #передаю сокет, путь к рабочей папке, имя файла, и true если AI описание, false если человеческая
                else:
                    params = {
                        'ddim_steps': 50,             #количество шагов выборки ddim
                        'ddim_eta': 0.0,              #значения от 0.0 до 1.0, η = 0.0 соответствует детерминированной выборке
                        'f': 8,                       #коэффициент понижающей дискретизации, чаще всего 8 или 16 (можно 4, тогда есть риск учетверения, но красиво)
                        'scale': 9.0,                 #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
                        'strength': 0.7,              #сила увеличения/уменьшения шума. 1.0 соответствует полному уничтожению информации в инициализирующем образе
                        'ckpt': 0,                    #выбор весов модели (от 0 до 10)
                        'seed': 42,                   #сид (для воспроизводимой генерации изображений)
                        "max_dim": pow(512, 2)        # я не могу генерировать на своей видюхе картинки больше 512 на 512
                    }


                    if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autophotonofacepreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autoproclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autoquickclr"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7
                    elif settings["autonoproartpreset"] == True:
                        params["ddim_steps"] = 50
                        params["scale"] = 9.0
                        params["ckpt"] = 0
                        params["ddim_eta"] = 0.0
                        params["strength"] = 0.7


                    w, h, binary_data = Stable_diffusion_image_to_image(init_img_binary_data, caption, params) #передаю сокет, путь к рабочей папке, имя файла, и true если AI описание, false если человеческая
                result_img = final_file_name + "_" + str(img_suf)
                with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                    f.write(binary_data)
                if need_restore == True: #если нужно восстановление
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                    with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                        f.write(binary_data)
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (result_img + ".png", binary_data) })
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name + final_file_name,
                    '6': task_id,
                    '7': postview,
                    '8': img_suf
                }

            elif task_type == 'f': #если нужно удалить фон у изображения
                if postview == None:
                    postview = str(base64.b64encode(init_img_binary_data).decode("utf-8"))
                params = {
                    "RescaleT": 320
                    }
                w, h, binary_data = Delete_background(init_img_binary_data, params) #передаю путь к рабочей папке и имя файла
                result_img = final_file_name + "_" + str(img_suf)
                with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                    f.write(binary_data)
                if need_restore == True: #если нужно восстановление
                    result_path = path_to_task_dir + "\\c_" + result_img
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    rbufer[0] = (0, 0, 0, 0)
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                    with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                        f.write(binary_data)
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": (result_img + ".png", binary_data)})
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name + final_file_name,
                    '6': task_id,
                    '7': postview,
                    '8': img_suf
                }

            elif task_type == 'a': #если нужно апскейлить изображение
                params = {
                    "model": 0,                         #Номер модели для обработки (0-5)
                    "denoise_strength": 0.5,            #Сила удаления шума. 0 для слабого удаления шума (шум сохраняется), 1 для сильного удаления шума. Используется только для модели 5 (realesr-general-x4v3 model)
                    "outscale": 4,                      #Величина того, во сколько раз увеличть разшрешение изображения (модель 3 x2, остальные x4)
                    "tile": 0,                          #Размер плитки, 0 для отсутствия плитки во время тестирования
                    "tile_pad": 10,                     #Заполнение плитки
                    "pre_pad": 0,                       #Предварительный размер заполнения на каждой границе
                    "face_enhance": False,              #Использовать GFPGAN улучшения лиц
                    "fp32": True,                       #Использовать точность fp32 во время вывода. По умолчанию fp16 (половинная точность)
                    "alpha_upsampler": "realesrgan",    #Апсемплер для альфа-каналов. Варианты: realesrgan | bicubic
                    "gpu-id": None                      #Устройство gpu для использования (по умолчанию = None) может быть 0, 1, 2 для обработки на нескольких GPU
                }


                if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autophotonofacepreset"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autoproclr"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autoproclr"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autoquickclr"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autoproartpreset"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5
                elif settings["autonoproartpreset"] == True:
                    params["ddim_steps"] = 50
                    params["tile"] = 0
                    params["model"] = 0
                    params["tile_pad"] = 10
                    params["pre_pad"] = 0
                    params["fp32"] = True
                    params["alpha_upsampler"] = True
                    params["denoise_strength"] = 0.5


                if settings["autofaceenchance"] == True:
                    params["face_enhance"] = True
                outscale = params["outscale"]
                w, h, binary_data = Upscale(init_img_binary_data, params) #передаю путь к рабочей папке
                result_img = final_file_name + "_" + str(img_suf)
                with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                    f.write(binary_data)
                if need_restore == True: #если нужно восстановление
                    result_path = path_to_task_dir + "\\c_" + result_img
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    rbufer[1] *= outscale
                    rbufer[2] *= outscale
                    rbufer[3] *= outscale
                    rbufer[4] *= outscale
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                    with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                        f.write(binary_data)
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, { "document": (result_img + ".png", binary_data) })
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name + final_file_name,
                    '6': task_id,
                    '7': "",
                    '8': img_suf
                }

            elif task_type == 't': #если нужно сгенерировать изображение по описанию
                caption = task[2]
                params = {
                    "steps": 50,            #количество шагов выборки
                    "sampler": "plms",      #обработчик (доступно "plms", "dpm" и "ddim")
                    "ddim_eta": 0.0,        #работает только при установке обработчика ddim, (значения от 0.0 до 1.0, η = 0.0 соответствует детерминированной выборке)
                    "f": 8,                 #коэффициент понижающей дискретизации, чаще всего 8 или 16, если поставить 4, будет красиво, но учетверяться
                    "scale": 9.0,           #безусловная навигационная величина: eps = eps(x, empty) + scale * (eps(x, cond) - eps(x, empty))
                    "ckpt": 0,              #выбор контрольной точки модели (0 или 1 для размерностей 512 или 768 соответственно)
                    "seed": 42              #сид (для воспроизводимой генерации изображений)
                }


                if settings["autophotofacepreset"] == True: #нужно настроить и убрать лишнее
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autophotonofacepreset"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autoproclr"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autoproclr"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autoquickclr"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autoproartpreset"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0
                elif settings["autonoproartpreset"] == True:
                    params["steps"] = 50
                    params["sampler"] = "plms"
                    params["ckpt"] = 0
                    params["ddim_eta"] = 0.0
                    params["scale"] = 9.0


                w, h, binary_data = Stable_diffusion_text_to_image(caption, params) #передаю сокет, путь к рабочей папке, имя файла и параметры генерации
                with open(path_to_task_dir + "\\tpicture_1.png", "wb") as f:
                    f.write(binary_data)
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {'document': ('drawing_0.png', binary_data)})
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': final_file_name,
                    '6': task_id,
                    '7': "",
                    '8': "1"
                }

            if task_type == 'o': #если нужно покрасить изображение
                if postview == None:
                    postview = str(base64.b64encode(init_img_binary_data).decode("utf-8"))
                w, h, binary_data = colorize(init_img_binary_data)
                result_img = final_file_name + "_" + str(img_suf)
                with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                    f.write(binary_data)
                if need_restore == True: #если нужно восстановление
                    result_path = path_to_task_dir + "\\c_" + result_img
                    chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": ("c_" + result_img + ".png", binary_data)})
                    rbufer[0] = (0, 0, 0, 0)
                    binary_data = Restore_Image(binary_data, rbufer, path_to_task_dir, result_img)
                    result_img = "r_" + result_img
                    with open(path_to_task_dir + "\\" + result_img + ".png", "wb") as f:
                        f.write(binary_data)
                chain_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + chain_id + "&chat_id=" + chat_id, {"document": (result_img + ".png", binary_data)})
                img = str(base64.b64encode(binary_data).decode('utf-8'))
                resp_data = {
                    '0': 'i',
                    '1': img,
                    '2': w,
                    '3': h,
                    '4': chain_id,
                    '5': new_img_name + final_file_name,
                    '6': task_id,
                    '7': postview,
                    '8': img_suf
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

pre_process = False

async def pre_processing(websocket, dictData_list):
    global pre_process
    while pre_process == True:
        dictData = dictData_list.pop()
        if(dictData["type"] == "s"): #если настройки
            is_task = False
        else:
            is_task = True
        user_path = build_connection(websocket, user_id, is_task)
        if user_path == False:
            if task_pre_list == []:
                pre_process = False
            break

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
                message_id = send_document_to_tg(URL + "sendDocument?chat_id=" + chat_id, {"document": ("drawing_0.png", result_binary_data)})
                task_dir = user_path + "/" + message_id
                os.mkdir(task_dir)
                with open(task_dir + "/drawing_0.png", "wb") as f:
                    f.write(result_binary_data)

                with open(task_dir + "/drawing_info_0.txt", "w") as f: #сбор статистики по рисунку
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
            task_list.append([websocket, 'c', img_name, img_suf, task_id, user_id, message_id, "AI_caption", noback]) #нужно описание
            
        elif dictData["type"] == "g": #нужна картина по описанию
            Is_depth = dictData["is_depth"]
            Is_upscale = dictData["is_upscale"]
            Is_upscale_xX = dictData["is_upscale_xX"]
            if Is_upscale or Is_upscale_xX == True:
                final_file_name = "big_image"
            else:
                final_file_name = "picture"
            if dictData["is_human_caption"] == False: #по машинному описанию
                Is_inpainting = False
                img_name = dictData["img_name"]
                img_suf = int(dictData["img_suf"])
                task_id = dictData["task_id"]
                message_id = dictData["chain_id"]
                caption = dictData["prompt"]
            else: #по человеческому описанию
                Is_inpainting = dictData["is_inpainting"]
                if dictData["chain_id"] == "":
                    binary_data = base64.b64decode(bytes(dictData["foreground"][22:], 'utf-8'))
                    pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                    (w, h) = pillow_img.size
                    if dictData["backgroung"] == "":
                        noback = True
                        background_img = Image.new('RGBA', (w, h), (255, 255, 255))
                    else:
                        noback = False
                        binary_data2 = base64.b64decode(bytes(dictData["backgroung"][22:], 'utf-8'))
                        background_img = Image.open(io.BytesIO(binary_data2)).convert("RGBA").resize((w, h))
                    drawing_img = background_img
                    if Is_inpainting == True:
                        noback = True
                    else:
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
                        with open(task_dir + "\\Human_caption_ru_" + str(img_suf) + ".txt", "w") as f:
                            f.write(dictData["prompt"])
                        time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                        result_text = translator.translate(dictData["prompt"], src = lang, dest = "en").text.replace(" -", "-")
                        message_id = send_message_to_tg(URL + "sendMessage?text=" + result_text + "&reply_to_message_id=" + task_id + "&chat_id=" + chat_id)
                    else:
                        result_text = dictData["prompt"]
                        message_id = task_id
                    with open(task_dir + "\\Human_caption_" + str(img_suf) + ".txt", "w") as f:
                        f.write(result_text)
                    caption = result_text
            if Is_inpainting == True:
                mask = make_mask(pillow_img, task_dir + "\\mask_" + str(img_suf) + ".png")
                message_id = send_document_to_tg(URL + "sendDocument?&reply_to_message_id=" + message_id + "caption=C маской&chat_id=" + chat_id, {"document": ("mask_" + str(img_suf) + ".png", mask)})
            else:
                mask = ""
            task_list.append([websocket, "p", img_name, img_suf, task_id, user_id, message_id, final_file_name, caption, Is_depth, Is_inpainting, Is_upscale, Is_upscale_xX, mask]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ
            
        elif(dictData["type"] == "b"): #нужно удалить фон у изображения
            if dictData["chain_id"] == "":
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                buf = io.BytesIO()
                pillow_img.save(buf, format = 'PNG')
                result_binary_data = buf.getvalue()
                message_id = send_document_to_tg(URL + "sendDocument?caption=Изображение для удаления фона&chat_id=" + chat_id, {'document': ('drawing_0.png', result_binary_data)})
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
            task_list.append([websocket, "f", img_name, img_suf, task_id, user_id, message_id, "object"]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения
            
        elif(dictData["type"] == "c"): #нужно покрасить изображение
            if dictData["chain_id"] == "":
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                buf = io.BytesIO()
                pillow_img.save(buf, format = 'PNG')
                result_binary_data = buf.getvalue()
                message_id = send_document_to_tg(URL + "sendDocument?caption=Изображение для окрашивания&chat_id=" + chat_id, {'document': ('drawing_0.png', result_binary_data)})
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
            task_list.append([websocket, "o", img_name, img_suf, task_id, user_id, message_id, "colored"]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения

        elif(dictData["type"] == "a"): #нужно апскейлить изображение
            if dictData["chain_id"] == "":
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                pillow_img = Image.open(io.BytesIO(binary_data)).convert("RGBA")
                buf = io.BytesIO()
                pillow_img.save(buf, format = 'PNG')
                result_binary_data = buf.getvalue()
                message_id = send_document_to_tg(URL + "sendDocument?caption=Изображение для апскейлинга&chat_id=" + chat_id, { "document": ('drawing_0.png', result_binary_data)})
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
            task_list.append([websocket, "a", img_name, img_suf, task_id, user_id, message_id, "big_image"]) #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения
            
        elif(dictData["type"] == "t"): #нужно сгенерировать изображение по описанию
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
            task_list.append([websocket, "t", result_text, img_suf, task_id, user_id, message_id, "tpicture"]) #дескриптор сокета, тип задания, текст описания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, Использовать ли SD2, или Dall-e 2
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
        if task_pre_list == []:
            pre_process = False

task_pre_list = []

async def handler(websocket): #здесь нужно формировать список текущих заданий, полученных от пользователей
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
            task_pre_list.append(dictData)
            global pre_process
            if pre_process == False:
                pre_process = True
                await pre_processing(websocket, task_pre_list) #вызывать её, если задание получено, передавать в неё список dictData, пока он не пуст, пусть его обрабатывает
            else:
                pre_process = True
    finally:
        print("Соединение разорвано со стороны пользователя")
        task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))

pre_process = False

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain("domain_name.crt", "private.key")
    start_server = websockets.serve(handler, "stabledraw.com", 8081, ssl = ssl_context, max_size = None)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()