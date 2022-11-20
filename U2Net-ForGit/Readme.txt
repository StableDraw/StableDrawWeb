u2net_test.py - генерирует маски по всем изображениям в ./test_data/test_images и помещает их в ./test_data/u2net_results
u2net_train.py - для тренировки, выложил на всякий случай
u2net_test2.py - убирает фон у изображений в ./test_data/test_images и помещает результат в ./test_data/u2net_results

Претренированные веса можно скачать через setup_model_weights.py, но нужно отдельно будет поставить в окружение gdown

Либо можно скачать веса отсюда: https://drive.google.com/file/d/1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ/view
И поместить скачанный файл в ./saved_models/u2net