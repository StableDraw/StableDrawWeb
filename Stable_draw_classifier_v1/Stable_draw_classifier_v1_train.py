import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import utils
from PIL import Image
import torch
import torch.nn as nn
import torch.optim as optim
from tensorflow import keras
from torch.utils.data import DataLoader, TensorDataset
import os

folder_path = 'Dataset_100_v1'

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

def augment(image, label, n):
    generated_images = []
    samples = np.expand_dims(image, 0)

    datagen = keras.preprocessing.image.ImageDataGenerator(horizontal_flip=True,
                                 width_shift_range=0.15,
                                 height_shift_range=0.15,
                                 rotation_range=30,
                                 brightness_range=[0.5, 1.5],
                                 zoom_range=[0.9, 1.2],
                                 channel_shift_range=15)
  
    iterator = datagen.flow(samples, batch_size=1)

    for i in range(n):
        batch = iterator.next()
        generated_images.append(batch[0].astype('uint8'))

    return generated_images, [label]*n

X, y = [], []
size = (128, 128)
background_color = "white"
test_image_files = os.listdir(folder_path) 

for file_idx in range(len(test_image_files)):
    img = Image.open(os.path.join(folder_path, test_image_files[file_idx])).convert('RGB')
    resized_img = np.array(resize_image(img, size, background_color)) 
    cropped_img = np.array(crop_max_square(img).resize((size[0], size[1]), Image.LANCZOS)) 
    X.append(cropped_img) 
    y.append(test_image_files[file_idx][0]) 

X = np.asarray(X)
y = np.reshape(np.asarray(y), (len(y), 1))
y = y.astype('float64') - np.ones((len(y), 1))
y = y.astype('<U1')
print('X shape:', X.shape, '\ny shape:', y.shape)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True, random_state=5)

print('X_train shape:', X_train.shape, '\ny_train shape:', y_train.shape, 
      '\nX_test shape:', X_test.shape, '\ny_test shape:', y_test.shape)

ax = []

train_counts = np.unique(y_train, return_counts=True)
test_counts = np.unique(y_test, return_counts=True)

generated_images, generated_labels = augment(X_train[0], y_train[0], 10)

augmented_images, augmented_labels = [], []

for i in range(len(X_train)):
    generated_images, generated_labels = augment(X_train[i], y_train[i], 10)
    augmented_images.extend(generated_images)
    augmented_labels.extend(generated_labels)

X_train, y_train = utils.shuffle(np.array(augmented_images), np.array(augmented_labels))

print('X_train shape:', X_train.shape, '\ny_train shape:', y_train.shape)

X_train, X_test = X_train / 255.0, X_test / 255.0

y_train = y_train.astype('float32').reshape((-1,1))
y_test = y_test.astype('float32').reshape((-1,1))

loss = nn.CrossEntropyLoss()
criterion = loss
epoch = 10

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
        accuarcy = total / correct
        return loss, accuarcy

device = "cuda" if torch.cuda.is_available() else "cpu"

model = ImageClassifier().to(device)

optimizer = optim.Adam(model.parameters(), lr = 0.001)

train_dataset = TensorDataset(torch.from_numpy(X_train.transpose((0, 3, 1, 2))).float().to(device), torch.from_numpy(y_train).long().to(device))
test_dataset = TensorDataset(torch.from_numpy(X_test.transpose((0, 3, 1, 2))).float().to(device), torch.from_numpy(y_test).long().to(device))

trainloader = DataLoader(train_dataset, batch_size = batch_size, shuffle = True)
valloader = DataLoader(test_dataset, batch_size = batch_size, shuffle = False)

model.train(trainloader, epoch, optimizer, criterion)
test_loss, accuarcy = model.evaluate(valloader, criterion)
print('Test Loss:', test_loss)
print('Test Accuracy:', str(np.round(accuarcy * 100, 3)) + "%")
state = {
    "epoch": epoch,
    "state_dict": model.state_dict(),
    "optimizer": optimizer.state_dict(),
}
torch.save(state, 'classifier.pth')



from Stable_draw_classifier_v1_test import test

test()#тест