chain_id = ""
task_id = ""
data = str(base64.b64encode(open("input\\image.png", "rb").read()).decode('utf-8'))
background_data = ""
local_is_drawing = False
local_sure = False
local_how_many_prims = 0
local_how_many_dots = 0
last_task_image_name = "drawing.png"
last_task_image_suffix = ""

#��������� �������� ��� �����������
#���������:
gen_caption = {
    "type": 'd', #������� ������������� �������� �����������
    "chain_id": chain_id, #id ���������� ����� ������� (�������� �� �������, ������� ����� "")
    "task_id": task_id, #id ������� (�������� �� �������, ������� ����� "")
    "data": data, #���������� ����������� ����� ������ dataURL
    "backgroung": background_data, #���������� ����������� ���� ����� ������ dataURL, ���� ""
    "is_drawing": local_is_drawing, #������� ��� ��� ��� (True/False) (����� ������� �����, ��� ��� ����� ����������)
    "sure": local_sure, #����� �� ��� �������/�� ������� (True/False) (����� ������� �����, ��� ��� ����� ����������)
    "prims_count": local_how_many_prims, #������� ���������� � ������� (����� ������� �����, ��� ��� ����� ����������)
    "dots_count": local_how_many_dots, #������� ����� � ������� (����� ������� �����, ��� ��� ����� ����������)
    "img_name": last_task_image_name, #��� ���������� �����������. �������� �� �������. ������� ��� "drawing.png"
    "img_suf": last_task_image_suffix #�������. �������� �� �������. ������� ��� "0"
}
'''
����������:
resp_data = {
    '0': 'c', #��, ��� ��� �����
    '1': task_id, #id �������, ��� ����� ���������
    '2': caption, #�������� � ���� ������ (����� ���� �� ����� �����, ��������� ��� ������������)
    '3': chain_id, #id ���������� ����� �������, ��� ����� ���������
    '4': new_img_name + orig_img_name, #��� �����������, ��� ����� ���������, ��� last_task_image_name
    '5': img_suf, #������� �����������, ��� ����� ���������
    '6': english_caption #�������� ����������� �� ���������� ����� � ���� ������
}
'''
is_depth = False
is_inpainting = False
is_upscale = False
full_prompt = "Black girl in sunglasses cyberpunk style"

#��������� ����������� �� ����������� � �������� �� ��������
#��������� ���������:
gen_image_by_image = {
    "type": 'g',
    "is_human_caption": True,
    "is_depth": is_depth, #����� dept2image, ���� True, ������ 2 ������ ���� False (���� ��� 3 == False, �� image2image)
    "is_inpainting": is_inpainting, #����� Inpainting, ���� True, ������ � ������� ������ ���� False (���� ��� 3 == False, �� image2image)
    "is_upscale": is_upscale, #����� ����������, ���� True, ������� 2 ������ ���� False (���� ��� 3 == False, �� image2image)
    "chain_id": chain_id, #id ���������� ����� ������� (�������� �� �������, ������� ����� "")
    "task_id": task_id, #id ������� (�������� �� �������, ������� ����� "")
    "foreground": data, #���������� ����������� ����� ������ dataURL
    "backgroung": background_data, #���������� ����������� ���� ����� ������ dataURL, ���� ""
    "prompt": full_prompt, #�������� ����������� (������)
    "is_drawing": local_is_drawing, #������� ��� ��� ��� (True/False) (����� ������� �����, ��� ��� ����� ����������)
    "sure": local_sure, #����� �� ��� �������/�� ������� (True/False) (����� ������� �����, ��� ��� ����� ����������)
    "prims_count": local_how_many_prims, #������� ���������� � ������� (����� ������� �����, ��� ��� ����� ����������)
    "dots_count": local_how_many_dots, #������� ����� � ������� (����� ������� �����, ��� ��� ����� ����������)
    "img_name": last_task_image_name, #��� ���������� �����������. �������� �� �������. ������� ��� "drawing.png"
    "img_suf": last_task_image_suffix #�������. �������� �� �������. ������� ��� "0"
}

original_caption = "Black girl in sunglasses cyberpunk style"
#��������� ����������� �� ����������� � �������� �� ���������
gen_image_by_image_AI_caption = {
    "type": 'g', #�������
    "is_human_caption": False,
    "is_depth": is_depth, #����� dept2image, ���� True, ������ ������ ���� False (���� ��� == False, �� image2image)
    "is_upscale": is_upscale, #����� ����������, ���� True, ������� ������ ���� False (���� ��� == False, �� image2image)
    "chain_id": chain_id, #id ���������� ����� ������� (�������� �� �������, ������� ����� "")
    "task_id": task_id, #id ������� (�������� �� �������, ������� ����� "")
    "img_name": last_task_image_name, #��� ���������� �����������. �������� �� �������. ������� ��� "drawing.png"
    "img_suf": last_task_image_suffix, #�������. �������� �� �������. ������� ��� "0"
    "prompt": original_caption #�������� �� ��������� � ���� ������
}

upscale_image = {
    "type": 'a', #������� ���������� �����������
    "data": data, #���������� ����������� ����� ������ dataURL
    "chain_id": chain_id, #id ���������� ����� ������� (�������� �� �������, ������� ����� "")
    "task_id": task_id, #id ������� (�������� �� �������, ������� ����� "")
    "img_name": last_task_image_name, #��� ���������� �����������. �������� �� �������. ������� ��� "drawing.png"
    "img_suf": last_task_image_suffix #�������. �������� �� �������. ������� ��� "0"
}

delete_background = {
    "type": 'b',
    "data": data, #���������� ����������� ����� ������ dataURL
    "chain_id": chain_id, #id ���������� ����� ������� (�������� �� �������, ������� ����� "")
    "task_id": task_id, #id ������� (�������� �� �������, ������� ����� "")
    "img_name": last_task_image_name, #��� ���������� �����������. �������� �� �������. ������� ��� "drawing.png"
    "img_suf": last_task_image_suffix #�������. �������� �� �������. ������� ��� "0"
}

gen_picture_by_prompt = {
    "type": "t",
    "prompt": full_prompt #�������� ����������� (������)
}
'''
��������� ����������*:
resp_data = {
    '0': 'i', #������������� ����, ��� ������ �����������
    '1': img, #���������� ����������� � ���� ������
    '2': w, #����������� ������ �����������, � ������ ����� ���������, ����� �� ��������������� ����������������
    '3': h, #����������� ������ �����������, � ������ ����� ���������, ����� �� ��������������� ����������������
    '4': chain_id, #id ���������� ����� �������
    '5': new_img_name + final_file_name, #��� �����������, ��� ������ ����� ���������
    '6': task_id, #id �������, ����� ���������
    '7': postview, #����������� � ���� ������ ��� ������ � ������ � ���������� ������������, �� ���������
    '8': img_suf #�������, ��� ������ ����� ���������
}
*������� ������� � Text2Image ���������� postview = ""
'''