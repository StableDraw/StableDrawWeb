from Image_caption_generator import Gen_caption
from tqdm import tqdm
import os

orig_params = {
    "ckpt": "ofa_huge_plaintext.pt", #используемые чекпоинты (caption_huge_best.pt или caption_base_best.pt или ofa_huge_plaintext.pt) #https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt
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

params = orig_params

test_list = [
    ["ckpt", ["caption_huge_best.pt", "caption_base_best.pt", "ofa_huge_plaintext.pt"]],
    ["f", [4, 8]],
    ["scale", [4.0, 15.0, 9.0]],
    ["ckpt", [1, 0]],
    ["seed", [415, 758, 8613, 42]],
    ["sampler", ["plms", "dpm", "ddim"]],
    ["ddim_eta", [0.25, 0.75, 1.0, 0.0]],
]

img_containers = []
#код для считывания бинари даты изщ изображения
for files, dir, root in Path("C:\img"):
    for f_name in files:
        with open(f_name, "rb") as f:
            binary_data = f.read()
        img_containers.append(f_name, binary_data)

path1 = "C:\\Users\\Robolightning\\Desktop\\r\\"

for tl in tqdm(test_list):
    for tp in tqdm(tl[1]):
        params = orig_params
        params[tl[0]] = tp
        path = path1 + tl[0] + "\\" + str(tp) + "\\"
        os.makedirs(path, exist_ok = True)
        for img_container in tqdm(img_containers):
            caption = Gen_caption(img_container[1], params)
            with open(path + img_container[0] + ".txt", "w") as f:
                f.write(caption)