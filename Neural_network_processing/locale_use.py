from Upscaler import Upscale

params = {
    "model": 3,                         #Номер модели для обработки (0-5)
    "denoise_strength": 0.5,            #Сила удаления шума. 0 для слабого удаления шума (шум сохраняется), 1 для сильного удаления шума. Используется только для модели 5 (realesr-general-x4v3 model)
    "outscale": 2,                      #Величина того, во сколько раз увеличть разшрешение изображения (модель 3 x2, остальные x4)
    "tile": 0,                          #Размер плитки, 0 для отсутствия плитки во время тестирования
    "tile_pad": 10,                     #Заполнение плитки
    "pre_pad": 0,                       #Предварительный размер заполнения на каждой границе
    "face_enhance": False,               #Использовать GFPGAN улучшения лиц
    "fp32": True,                       #Использовать точность fp32 во время вывода. По умолчанию fp16 (половинная точность)
    "alpha_upsampler": "bicubic",    #Апсемплер для альфа-каналов. Варианты: realesrgan | bicubic
    "gpu-id": None                      #Устройство gpu для использования (по умолчанию = None) может быть 0, 1, 2 для обработки на нескольких GPU
}

with open("C:\\repos\\Real-ESRGAN\\MCDataset\\alpha\\16t\\5.png", "rb") as f:
    init_img_binary_data = f.read()
w, h, binary_data = Upscale(init_img_binary_data, params)
with open("C:\\repos\\img.png", "wb") as f:
    f.write(binary_data)