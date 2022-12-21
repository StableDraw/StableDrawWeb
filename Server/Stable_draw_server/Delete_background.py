from skimage import io as skio
import io 
import torch
from torch.autograd import Variable
from torch.utils.data import DataLoader
from torchvision import transforms
from PIL import Image
from model.data_loader import RescaleT
from model.data_loader import ToTensorLab
from model.data_loader import SalObjDataset
from model import U2NET

#Директория для весов
model_dir = "saved_models\\u2net.pth"

def Delete_background(workpath, img_name):
    img_name_list = [workpath + "\\" + img_name]
    test_salobj_dataset = SalObjDataset(img_name_list = img_name_list, lbl_name_list = [], transform=transforms.Compose([RescaleT(320), ToTensorLab(flag=0)])) #Загрузчик даных
    test_salobj_dataloader = DataLoader(test_salobj_dataset, batch_size=1, shuffle = False, num_workers=1)
    net = U2NET(3, 1)
    if torch.cuda.is_available():
        net.load_state_dict(torch.load(model_dir))
        net.cuda()
    else:
        net.load_state_dict(torch.load(model_dir, map_location = 'cuda'))
    net.eval()
    for data in test_salobj_dataloader: #вывод для каждого изображения
        image_name = img_name_list[0]
        inputs = data['image']
        inputs = inputs.type(torch.FloatTensor)
        if torch.cuda.is_available():
            inputs = Variable(inputs.cuda())
        else:
            inputs = Variable(inputs)
        pred = net(inputs)[0][:, 0, :, :] #нормализация
        mi = torch.min(pred)
        pred = ((pred - mi) / (torch.max(pred) - mi)).squeeze()
        predict_np = pred.cpu().data.numpy()
        im = Image.fromarray(predict_np * 255).convert('L')
        image = skio.imread(image_name)
        orig = Image.open(image_name).convert('RGB')
        imo = im.resize((image.shape[1], image.shape[0]), resample = Image.BILINEAR)
        orig.putalpha(imo)
        buf = io.BytesIO()
        orig.save(buf, format = 'PNG')
        result_binary_data = buf.getvalue()
        (w, h) = orig.size
        orig.save(workpath + '\\object.png')
    return w, h, result_binary_data