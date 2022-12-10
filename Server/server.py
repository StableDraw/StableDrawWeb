import asyncio
from fnmatch import translate
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

checkpoint_path = 'caption.pt'
if not os.path.exists(checkpoint_path):
    import urllib.request
    urllib.request.urlretrieve("https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt", checkpoint_path)

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
with open("token.txt", "r") as f:
    TOKEN = f.read()

URL = "https://api.telegram.org/bot{}/".format(TOKEN)

task_list = [] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id

user_id = "0" #Пока что мы не знаем id (убрать)
need_translate = True #пока нет настроек, будем переводить всё (убрать)


process = False
nprocess = False

def get_message_id(req):
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
        req = requests.post(URL + "sendMessage?text=" + orig_p + "&reply_to_message_id=" + rep_mess_id + "&chat_id=-1001784737051")
        time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
        message_id = get_message_id(req)
    else:
        message_id = rep_mess_id
    return prompt, message_id

async def neural_processing(process, nprocess):
    if nprocess == True:
        return
    while process:
        nprocess = True
        if len(task_list) != 0:
            task = task_list.pop(0)
            websocket = task[0]
            #await websocket.send(json.dumps({'0' : "t", '1' : "Обработка началась"})) #костыль
            path_to_task_dir = "log\\" + task[3] + "\\"  + task[2]
            if task[1] == 'c': #если нужно сгенерировать подпись
                client_message = await Gen_caption(websocket, path_to_task_dir + "/drawing.png")
                client_message, rep_mess_id = del_prompt_about_drawing(client_message, task[2], task[5])
                with open(path_to_task_dir + "/AI_caption.txt", "w") as f:
                    f.write(client_message)
                req = requests.post(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + rep_mess_id + "&chat_id=-1001784737051")
                message_id = get_message_id(req)
                if task[4] == True:
                    translator = Translator()
                    client_message = translator.translate(client_message, src = 'en', dest = 'ru').text
                    with open(path_to_task_dir + "/AI_caption_ru.txt", "w") as f:
                        f.write(client_message)
                    time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                    req = requests.post(URL + "sendMessage?text=" + client_message + "&reply_to_message_id=" + message_id + "&chat_id=-1001784737051")
                    message_id = get_message_id(req)
                resp_data = {
                    '0' : "c",
                    '1' : task[2],
                    '2' : client_message,
                    '3' : message_id
                }
            elif task[1] == 'p': #если нужно сгенерировать изображение по AI подписи
                #w, h, binary_data = await Stable_diffusion(websocket, path_to_task_dir, True) #передаю сокет, путь к рабочей папке, и true если AI подпись, false если человеческая
                if (task[5]):
                    w, h, binary_data = await Stable_diffusion_2(websocket, path_to_task_dir, task[6]) #передаю сокет, путь к рабочей папке, и true если AI подпись, false если человеческая
                else:
                    w, h, binary_data = await Stable_diffusion(websocket, path_to_task_dir, task[6]) #передаю сокет, путь к рабочей папке, и true если AI подпись, false если человеческая
                img = base64.b64encode(binary_data).decode('utf-8')
                files = {'document': ('drawing.png', binary_data)}
                req = requests.post(URL + "sendDocument?&reply_to_message_id=" + task[4] + "&chat_id=-1001784737051", files = files)
                message_id = get_message_id(req)
                resp_data = {
                    '0' : "i",
                    '1' : str(img),
                    '2' : w,
                    '3' : h,
                    '4' : message_id
                }
            elif task[1] == 'f': #если нужно удалить фон у изображения
                w, h, binary_data = Delete_background(path_to_task_dir) #передаю путь к рабочей папке
                img = base64.b64encode(binary_data).decode('utf-8')
                files = {'document': ('object.png', binary_data)}
                req = requests.post(URL + "sendDocument?&reply_to_message_id=" + task[4] + "&chat_id=-1001784737051", files = files)
                message_id = get_message_id(req)
                resp_data = {
                    '0' : "i",
                    '1' : str(img),
                    '2' : w,
                    '3' : h,
                    '4' : message_id
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
            if(dictData["type"] == "d"):
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                pillow_img = Image.open(io.BytesIO(binary_data))
                (w, h) = pillow_img.size
                if dictData["backgroung"] == "":
                    noback = True
                    background_img = Image.new('RGB', (w, h), (255, 255, 255))
                else:
                    print("\nback")
                    noback = False
                    binary_data2 = base64.b64decode(bytes(dictData["backgroung"][22:], 'utf-8'))
                    background_img = Image.open(io.BytesIO(binary_data2))
                    background_img = background_img.resize((w, h))
                drawing_img = background_img
                drawing_img.paste(pillow_img, (0,0),  pillow_img)
                buf = io.BytesIO()
                drawing_img.save(buf, format='PNG')
                result_binary_data = buf.getvalue()
                files = {'document': ('drawing.png', result_binary_data)}
                req = requests.post(URL + "sendDocument?chat_id=-1001784737051", files = files)
                message_id = get_message_id(req)
                task_dir = user_path + "/" + str(message_id)
                os.mkdir(task_dir)
                with open(task_dir + "/drawing.png", "wb") as f:
                    f.write(result_binary_data)
                if noback == False:
                    with open(task_dir + "/background.png", "wb") as f:
                        f.write(binary_data2)
                    with open(task_dir + "/foreground.png", "wb") as f:
                        f.write(binary_data)
                task_list.append([websocket, "c", message_id, user_id, need_translate, noback]) #нужна подпись
            elif(dictData["type"] == "g1" or dictData["type"] == "g2"): #нужна картина по AI подписи
                if dictData["type"] == "g1":
                    is_SD2 = False
                else:
                    is_SD2 = True
                cur_task = [websocket, "p", dictData["task_id"], user_id, dictData["chain_id"], is_SD2, True] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ
                task_list.append(cur_task)
            elif(dictData["type"] == "hg1" or dictData["type"] == "hg2"): #нужна картина по человеческой подписи
                if dictData["type"] == "hg1":
                    is_SD2 = False
                else:
                    is_SD2 = True
                binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                pillow_img = Image.open(io.BytesIO(binary_data))
                (w, h) = pillow_img.size
                if dictData["backgroung"] == "":
                    noback = True
                    background_img = Image.new('RGB', (w, h), (255, 255, 255))
                else:
                    print("\nback")
                    noback = False
                    binary_data2 = base64.b64decode(bytes(dictData["backgroung"][22:], 'utf-8'))
                    background_img = Image.open(io.BytesIO(binary_data2))
                    background_img = background_img.resize((w, h))
                drawing_img = background_img
                drawing_img.paste(pillow_img, (0,0),  pillow_img)
                buf = io.BytesIO()
                drawing_img.save(buf, format = 'PNG')
                result_binary_data = buf.getvalue()
                files = {'document': ('drawing.png', result_binary_data)}
                req = requests.post(URL + "sendDocument?caption=" + dictData["prompt"] + "&chat_id=-1001784737051", files = files)
                task_id = get_message_id(req)
                task_dir = user_path + "/" + str(task_id)
                os.mkdir(task_dir)
                with open(task_dir + "/drawing.png", "wb") as f:
                    f.write(result_binary_data)
                if noback == False:
                    with open(task_dir + "/background.png", "wb") as f:
                        f.write(binary_data2)
                    with open(task_dir + "/foreground.png", "wb") as f:
                        f.write(binary_data)
                translator = Translator()
                lang = translator.detect(dictData["prompt"]).lang
                if lang != 'en':
                    with open(task_dir + "/AI_caption_ru.txt", "w") as f:
                        f.write(dictData["prompt"])
                    time.sleep(0.3) #иметь ввиду, что тут слип, убрать его потом, после отключения от Телеги (убрать)
                    result_text = translator.translate(dictData["prompt"], src = lang, dest = 'en').text
                    req = requests.post(URL + "sendMessage?text=" + result_text + "&reply_to_message_id=" + task_id + "&chat_id=-1001784737051")
                    message_id = get_message_id(req)
                else:
                    result_text = dictData["prompt"]
                    message_id = task_id
                with open(task_dir + "/Human_caption.txt", "w") as f:
                    f.write(result_text)
                cur_task = [websocket, "p", task_id, user_id, message_id, is_SD2, False] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ
                task_list.append(cur_task)
            elif(dictData["type"] == "b"): #нужно удалить фон у изображения
                print(dictData)
                if dictData["chain_id"] == -1:
                    binary_data = base64.b64decode(bytes(dictData["data"][22:], 'utf-8'))
                    pillow_img = Image.open(io.BytesIO(binary_data))
                    buf = io.BytesIO()
                    pillow_img.save(buf, format = 'PNG')
                    result_binary_data = buf.getvalue()
                    files = {'document': ('drawing.png', result_binary_data)}
                    req = requests.post(URL + "sendDocument?caption=Изображение для удаления фона&chat_id=-1001784737051", files = files)
                    message_id = get_message_id(req)
                    task_id = message_id
                    task_dir = user_path + "/" + str(message_id)
                    os.mkdir(task_dir)
                    with open(task_dir + "/picture.png", "wb") as f:
                        f.write(result_binary_data)
                else:
                    message_id = dictData["chain_id"]
                    task_id = dictData["task_id"]
                cur_task = [websocket, "f", task_id, user_id, message_id] #дескриптор сокета, тип задания, номер сообщения ТГ (id задания), user_id, номер последнего ответа ТГ, ширину и высоту исходного изображения
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
    finally:
        print("Соединение разорвано со стороны пользователя")
        task_list.pop(next(i for i, (x, _) in enumerate(task_list) if x == websocket))

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain("C:/Apache24/ssl/domain_name.crt", "C:/Apache24/ssl/private.key")
    start_server = websockets.serve(handler, "stabledraw.com", 8081, ssl = ssl_context, max_size = None)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()