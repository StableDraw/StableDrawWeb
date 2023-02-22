from __future__ import print_function
import logging
import grpc
import helloworld_pb2
import helloworld_pb2_grpc
import json
import base64

chain_id = ""
task_id = ""
data = "data:image/png;base64," + str(base64.b64encode(open("image.png", "rb").read()).decode('utf-8'))
background_data = ""
local_is_drawing = False
local_sure = False
local_how_many_prims = 0
local_how_many_dots = 0
last_task_image_name = "drawing.png"
last_task_image_suffix = ""

#Генерация описания для изображения
#Принимает:
gen_caption = {
    "type": 'd', #просьба сгенерировать описание изображения
    "chain_id": chain_id, #id последнего звена цепочки (получаем от сервера, вначале равно "")
    "task_id": task_id, #id задания (получаем от сервера, вначале равно "")
    "data": data, #содержимое изображения ввиде строки dataURL
    "backgroung": background_data, #содержимое изображения фона ввиде строки dataURL, либо ""
    "is_drawing": local_is_drawing, #рисунок это или нет (True/False) (можно ставить любое, это для сбора статистики)
    "sure": local_sure, #точно ли это рисунок/не рисунок (True/False) (можно ставить любое, это для сбора статистики)
    "prims_count": local_how_many_prims, #Сколько примитивов в рисунке (можно ставить любое, это для сбора статистики)
    "dots_count": local_how_many_dots, #Сколько точек в рисунке (можно ставить любое, это для сбора статистики)
    "img_name": last_task_image_name, #Имя последнего изображения. Получаем от сервера. Вначале это "drawing.png"
    "img_suf": last_task_image_suffix #Суффикс. Получаем от сервера. Вначале это "0"
}
'''
Возвращает:
resp_data = {
    '0': 'c', #то, что это текст
    '1': task_id, #id задания, его нужно запомнить
    '2': caption, #описание в виде строки (может быть на любом языке, выводится для пользователя)
    '3': chain_id, #id последнего звена цепочки, его нужно запомнить
    '4': new_img_name + orig_img_name, #имя изображения, его нужно запомнить, это last_task_image_name
    '5': img_suf, #суффикс изображения, его нужно запомнить
    '6': english_caption #описание изображения на английском языке в виде строки
}
'''
is_depth = False
is_inpainting = False
is_upscale = False
full_prompt = "Black girl in sunglasses cyberpunk style"

#Генерация изображения по изображению и описанию от человека
#Остальные принимают:
gen_image_by_image = {
    "type": 'g',
    "is_human_caption": True,
    "is_depth": is_depth, #Режим dept2image, если True, нижние 2 должны быть False (если все 3 == False, то image2image)
    "is_inpainting": is_inpainting, #Режим Inpainting, если True, нижний и верхний должны быть False (если все 3 == False, то image2image)
    "is_upscale": is_upscale, #Режим апскейлера, если True, верхние 2 должны быть False (если все 3 == False, то image2image)
    "chain_id": chain_id, #id последнего звена цепочки (получаем от сервера, вначале равно "")
    "task_id": task_id, #id задания (получаем от сервера, вначале равно "")
    "foreground": data, #содержимое изображения ввиде строки dataURL
    "backgroung": background_data, #содержимое изображения фона ввиде строки dataURL, либо ""
    "prompt": full_prompt, #описание изображения (строка)
    "is_drawing": local_is_drawing, #рисунок это или нет (True/False) (можно ставить любое, это для сбора статистики)
    "sure": local_sure, #точно ли это рисунок/не рисунок (True/False) (можно ставить любое, это для сбора статистики)
    "prims_count": local_how_many_prims, #Сколько примитивов в рисунке (можно ставить любое, это для сбора статистики)
    "dots_count": local_how_many_dots, #Сколько точек в рисунке (можно ставить любое, это для сбора статистики)
    "img_name": last_task_image_name, #Имя последнего изображения. Получаем от сервера. Вначале это "drawing.png"
    "img_suf": last_task_image_suffix #Суффикс. Получаем от сервера. Вначале это "0"
}

original_caption = "Black girl in sunglasses cyberpunk style"
#Генерация изображения по изображению и описанию от нейросети
gen_image_by_image_AI_caption = {
    "type": 'g', #рисунок
    "is_human_caption": False,
    "is_depth": is_depth, #Режим dept2image, если True, нижний должен быть False (если оба == False, то image2image)
    "is_upscale": is_upscale, #Режим апскейлера, если True, верхний должен быть False (если оба == False, то image2image)
    "chain_id": chain_id, #id последнего звена цепочки (получаем от сервера, вначале равно "")
    "task_id": task_id, #id задания (получаем от сервера, вначале равно "")
    "img_name": last_task_image_name, #Имя последнего изображения. Получаем от сервера. Вначале это "drawing.png"
    "img_suf": last_task_image_suffix, #Суффикс. Получаем от сервера. Вначале это "0"
    "prompt": original_caption #описание от нейросети в виде строки
}

upscale_image = {
    "type": 'a', #просьба апскейлить изображение
    "data": data, #содержимое изображения ввиде строки dataURL
    "chain_id": chain_id, #id последнего звена цепочки (получаем от сервера, вначале равно "")
    "task_id": task_id, #id задания (получаем от сервера, вначале равно "")
    "img_name": last_task_image_name, #Имя последнего изображения. Получаем от сервера. Вначале это "drawing.png"
    "img_suf": last_task_image_suffix #Суффикс. Получаем от сервера. Вначале это "0"
}

delete_background = {
    "type": 'b',
    "data": data, #содержимое изображения ввиде строки dataURL
    "chain_id": chain_id, #id последнего звена цепочки (получаем от сервера, вначале равно "")
    "task_id": task_id, #id задания (получаем от сервера, вначале равно "")
    "img_name": last_task_image_name, #Имя последнего изображения. Получаем от сервера. Вначале это "drawing.png"
    "img_suf": last_task_image_suffix #Суффикс. Получаем от сервера. Вначале это "0"
}

gen_picture_by_prompt = {
    "type": "t",
    "prompt": full_prompt #описание изображения (строка)
}
'''
Остальные возвращают*:
resp_data = {
    '0': 'i', #идентификатор того, что пришло изображение
    '1': img, #содержимое изображения в виде строки
    '2': w, #виртуальная ширина изображения, её просто нужно запомнить, может не соответствовать действительности
    '3': h, #виртуальная высота изображения, её просто нужно запомнить, может не соответствовать действительности
    '4': chain_id, #id последнего звена цепочки
    '5': new_img_name + final_file_name, #имя изображения, его просто нужно запомнить
    '6': task_id, #id задания, нужно запомнить
    '7': postview, #изображение в виде строки для показа в окошке с предыдущим изображением, до генерации
    '8': img_suf #суффикс, его просто нужно запомнить
}
*апскейл обычный и Text2Image возвращают postview = ""
'''

def run():
    MAX_MESSAGE_LENGTH = 100 * 1024 * 1024
    options = [
        ('grpc.max_send_message_length', MAX_MESSAGE_LENGTH),
        ('grpc.max_receive_message_length', MAX_MESSAGE_LENGTH),
    ]
    with grpc.insecure_channel("109.111.179.197:8081", options = options) as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        dict_to_server = gen_image_by_image
        json_to_server = json.dumps(dict_to_server)
        message = helloworld_pb2.HelloRequest(name = json_to_server)
        response = stub.SayHello(message)
        json_from_server = response.message
        dict_from_server = json.loads(json_from_server)
    print(dict_from_server)

if __name__ == '__main__':
    logging.basicConfig()
    run()