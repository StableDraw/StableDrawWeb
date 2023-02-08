from dalle2_laion import utils
from dalle2_laion.scripts import BasicInference, ImageVariation, BasicInpainting
from typing import List
import os
import io
import click
from pathlib import Path

model_config_upsampler = "./configs/upsampler.example.json" #Path to model config file
model_config_variation = "./configs/variation.example.json" #Path to model config file

async def Dall_e_2_text_to_image(ws, work_path, prompt, opt):
    model_config = model_config_upsampler
    decoder_batch_size = opt["decoder-batch-size"]
    verbose = opt["verbose"]
    dreamer: BasicInference = BasicInference.create(model_config, verbose = verbose, check_updates = not opt['suppress_updates'])
    #print("Инициализация дешифровщика невидимого водяного знака...")
    #wm = "SDV2"
    #wm_encoder = WatermarkEncoder()
    #wm_encoder.set_watermark('bytes', wm.encode('utf-8'))
    output_map = dreamer.run([prompt], prior_sample_count = 1, decoder_batch_size = decoder_batch_size)
    for text in output_map:
        image = output_map[text][0][0]
    #image = put_watermark(img, wm_encoder)
    w, h = image.size
    buf = io.BytesIO()
    image.save(buf, format = "PNG")
    b_data = buf.getvalue()
    image.save(work_path + "\\tpicture_1.png")
    image.close
    return w, h, b_data

def variation(opt, output_path):
    model_config = model_config_variation
    verbose = opt["verbose"]
    decoder_batch_size = opt["decoder-batch-size"]
    variation: ImageVariation = ImageVariation.create(model_config, verbose = verbose, check_updates = not opt['suppress_updates'])
    decoder_data_requirements = variation.model_manager.decoder_info.data_requirements
    image_filepaths: List[Path] = []
    text_prompts: List[str] = [] if decoder_data_requirements.text_encoding else None
    print("Enter paths to your images. If you specify a directory all images within will be added. Enter an empty line to finish.")
    if decoder_data_requirements.text_encoding:
        print("This decoder was also conditioned on text. You will need to enter a prompt for each image you use.")
    while True:
        image_filepath: Path = click.prompt(f'File {len(image_filepaths) + 1}', default = Path(), type = Path, show_default = False)
        if image_filepath == Path():
            break
        if image_filepath.is_dir():
            new_image_paths = utils.get_images_in_dir(image_filepath)
        elif utils.is_image_file(image_filepath):
            new_image_paths = [image_filepath]
        else:
            print(f"{image_filepath} is not a valid image file.")
            continue
        if decoder_data_requirements.text_encoding:
            for image_path in new_image_paths:
                text_prompt = click.prompt(f'Prompt for {image_path.name}', default = utils.get_prompt_from_filestem(image_path.stem), type = str, show_default = True)
                text_prompts.append(text_prompt)
        image_filepaths.extend(new_image_paths)
    print(f"Found {len(image_filepaths)} images.")
    images = utils.get_images_from_paths(image_filepaths)
    num_samples = click.prompt('How many samples would you like to generate for each image?', default = 1, type = int)
    output_map = variation.run(images, text = text_prompts, sample_count = num_samples, batch_size = decoder_batch_size)
    for file_index, generation_list in output_map.items():
        file = image_filepaths[file_index].stem
        for i, image in enumerate(generation_list):
            image.save(os.path.join(output_path, f"{file}_{i}.png"))

def inpaint(output_path, opt):
    model_config = model_config_upsampler
    verbose = opt["verbose"]
    inpainting: BasicInpainting = BasicInpainting.create(model_config, verbose = verbose, check_updates = not opt['suppress_updates'])
    image_filepaths: List[Path] = []
    mask_filepaths: List[Path] = []
    text_prompts: List[str] = []
    print("You will be entering the paths to your images and masks one at a time. Enter an empty image path to continue")
    while True:
        image_filepath: Path = click.prompt(f'File {len(image_filepaths) + 1}', default = Path(), type = Path, show_default = False)
        if image_filepath == Path():
            break
        if not utils.is_image_file(image_filepath):
            print(f"{image_filepath} is not a valid image file.")
            continue
        mask_filepath: Path = click.prompt(f'Mask for {image_filepath.name}', default = Path(), type = Path, show_default = False)
        if not utils.is_image_file(mask_filepath):
            print(f"{mask_filepath} is not a valid image file.")
            continue
        text_prompt = click.prompt(f'Prompt for {image_filepath.name}', default = utils.get_prompt_from_filestem(image_filepath.stem), type = str, show_default = True)
        image_filepaths.append(image_filepath)
        mask_filepaths.append(mask_filepath)
        text_prompts.append(text_prompt)
    print(f"Found {len(image_filepaths)} images.")
    images = utils.get_images_from_paths(image_filepaths)
    mask_images = utils.get_images_from_paths(mask_filepaths)
    min_image_size = float('inf')
    for i, image, mask_image, filepath in zip(range(len(images)), images, mask_images, image_filepaths):
        assert image.size == mask_image.size, f"Image {filepath.name} has different dimensions than mask {mask_filepaths[i].name}"
        if min(image.size) < min_image_size:
            min_image_size = min(image.size)
        if image.size[1] != image.size[0]:
            print(f"{filepath.name} is not a square image. It will be center cropped into a square.")
            images[i] = utils.center_crop_to_square(image)
            mask_images[i] = utils.center_crop_to_square(mask_image)
    print(f"Minimum image size is {min_image_size}. All images will be resized to this size for inference.")
    images = [image.resize((min_image_size, min_image_size)) for image in images]
    mask_images = [mask_image.resize((min_image_size, min_image_size)) for mask_image in mask_images]
    masks = [utils.get_mask_from_image(mask_image) for mask_image in mask_images]
    num_samples = click.prompt('How many samples would you like to generate for each image?', default = 1, type = int)
    output_map = inpainting.run(images, masks, text = text_prompts, sample_count = num_samples)
    os.makedirs(output_path, exist_ok = True)
    for file_index, generation_list in output_map.items():
        file = image_filepaths[file_index].stem
        for i, image in enumerate(generation_list):
            image.save(os.path.join(output_path, f"{file}_{i}.png"))