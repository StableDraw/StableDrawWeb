import torch
import numpy as np
from fairseq import utils, tasks
from fairseq import checkpoint_utils
from tasks.mm_tasks.caption import CaptionTask
from PIL import Image
from torchvision import transforms
from utils.eval_utils import eval_caption
import argparse


# Default paths
img_path    = 'usr_data/img/image.png'
result_path = 'usr_data/cap/caption.txt'
checkpoint_path = 'checkpoints/caption.pt'


# Text preprocess
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


# Construct input for caption task
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


# Function to turn FP32 to FP16
def apply_half(t):
    if t.dtype is torch.float32:
        return t.to(dtype=torch.half)
    return t

def main(args):
    tasks.register_task('caption', CaptionTask)
    use_cuda = torch.cuda.is_available()
    use_fp16 = False

    # Load pretrained ckpt & config
    print('Load pretrained checkpoint & config...')
    overrides={"eval_cider":False, "beam":5, "max_len_b":16, "no_repeat_ngram_size":3, "seed":7}
    models, cfg, task = checkpoint_utils.load_model_ensemble_and_task(
            utils.split_paths(args.checkpoint_path),
            arg_overrides=overrides
        )

    # Move models to GPU
    for model in models:
        model.eval()
        if use_fp16:
            model.half()
        if use_cuda and not cfg.distributed_training.pipeline_model_parallel:
            model.cuda()
        model.prepare_for_inference_(cfg)

    # Initialize generator
    generator = task.build_generator(models, cfg.generation)

    # Image transform
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

    image = Image.open(args.img_path)

    # Construct input sample & preprocess for GPU if cuda available
    print('Construct input sample...')
    sample = construct_sample(image, task, patch_resize_transform)
    sample = utils.move_to_cuda(sample) if use_cuda else sample
    sample = utils.apply_to_sample(apply_half, sample) if use_fp16 else sample

    # Run eval step for caption
    print('Evaluate caption...')
    with torch.no_grad():
        result, scores = eval_caption(task, generator, models, sample)

    caption = result[0]['caption']
    with open(args.result_path, mode='w') as f:
        f.write(caption)



if __name__ == '__main__':
    print('Image captioning start...')
    parser = argparse.ArgumentParser()
    parser.add_argument('--img', default=img_path, dest='img_path', help='Path to image')
    parser.add_argument('--cap', default=result_path, dest='result_path', help='Path to result')
    parser.add_argument('--ckpt', default=checkpoint_path, dest='checkpoint_path', help='Path to result')
    main(parser.parse_args())
    print('Image captioning finish.')
