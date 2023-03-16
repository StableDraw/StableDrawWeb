import numpy as np
from PIL import Image
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

folder_path = 'C:\\repos\\Stable_draw_classifier_v1\\Dataset_100_v1'

classes = [
    "face",
    "photo no face",
    "pro drawing",
    "none pro drawing",
    "pro line",
    "quick line"
]

def resize_image(src_img, size, bg_color): 
    src_img.thumbnail(size, Image.LANCZOS) 
    new_image = Image.new("RGB", size, bg_color)
    new_image.paste(src_img, (int((size[0] - src_img.size[0]) / 2), int((size[1] - src_img.size[1]) / 2)))
    return new_image

def crop_center(pil_img, crop_width, crop_height):
    img_width, img_height = pil_img.size
    return pil_img.crop(((img_width - crop_width) // 2,
                         (img_height - crop_height) // 2,
                         (img_width + crop_width) // 2,
                         (img_height + crop_height) // 2))


def crop_max_square(pil_img):
    return crop_center(pil_img, min(pil_img.size), min(pil_img.size))

batch_size = 32

class ImageClassifier(nn.Module):
    def __init__(self): 
        super(ImageClassifier, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout1 = nn.Dropout(0.25)
        self.conv3 = nn.Conv2d(32, 64, 3, padding=1)
        self.conv4 = nn.Conv2d(64, 64, 3, padding=1)
        self.dropout2 = nn.Dropout(0.25)
        self.conv5 = nn.Conv2d(64, 128, 3, padding=1)
        self.conv6 = nn.Conv2d(128, 128, 3, padding=1)
        self.dropout3 = nn.Dropout(0.25)
        self.fc1 = nn.Linear(128 * 16 * 16, 512)
        self.dropout4 = nn.Dropout(0.5)
        self.fc2 = nn.Linear(512, 6)
    
    def forward(self, x):
        x = nn.functional.relu(self.conv1(x))
        x = nn.functional.relu(self.conv2(x))
        x = self.pool(x)
        x = self.dropout1(x)
        x = nn.functional.relu(self.conv3(x))
        x = nn.functional.relu(self.conv4(x))
        x = self.pool(x)
        x = self.dropout2(x)
        x = nn.functional.relu(self.conv5(x))
        x = nn.functional.relu(self.conv6(x))
        x = self.pool(x)
        x = self.dropout3(x)
        x = x.view(-1, 128 * 16 * 16)
        x = nn.functional.relu(self.fc1(x))
        x = self.dropout4(x)
        x = nn.functional.softmax(self.fc2(x), dim = 1)
        return x

    def train(self, trainloader, epoch, optimizer, criterion):
        for epoch in range(epoch):
            running_loss = 0.0
            for i, data in enumerate(trainloader, 0):
                inputs, labels = data
                optimizer.zero_grad()
                outputs = self(inputs)
                loss = criterion(outputs, labels.flatten())
                loss.backward()
                optimizer.step()
                running_loss += loss.item()
            print('[Epoch %d] loss: %.3f' % (epoch + 1, running_loss / len(trainloader)))

    def evaluate(self, dataloader, criterion):
        correct = 0
        total = 0
        loss = 0.0
        with torch.no_grad():
            for data in dataloader:
                images, labels = data
                outputs = self(images)
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                loss += criterion(outputs, labels.flatten()).item()
        loss = loss / len(dataloader)
        return loss

def test():
    device = "cuda" if torch.cuda.is_available() else "cpu"

    model = ImageClassifier().to(device)

    checkpoint = torch.load('classifier.pth', map_location = torch.device('cpu'))
    model.load_state_dict(checkpoint["state_dict"])

    X, y = [], []
    size = (128, 128)
    background_color = "white"

    img = Image.open("4.jpg").convert('RGB')
    resized_img = np.array(resize_image(img, size, background_color)) 
    cropped_img = np.array(crop_max_square(img).resize((size[0], size[1]), Image.LANCZOS)) 
    X.append(cropped_img) 
    y.append(1) #имя класса
    X = np.asarray(X)
    y = np.reshape(np.asarray(y), (len(y), 1))
    y = y.astype('float64') - np.ones((len(y), 1))
    y = y.astype('<U1')
    X = X / 255.0
    y = y.astype('float32').reshape((-1,1))
    data = TensorDataset(torch.from_numpy(X.transpose((0, 3, 1, 2))).float().to(device), torch.from_numpy(y).long().to(device))

    dataloader = DataLoader(data, batch_size=batch_size, shuffle=True)

    with torch.no_grad():
        for data in dataloader:
            images, labels = data
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
    print('Predicted: ' + classes[predicted[0]])