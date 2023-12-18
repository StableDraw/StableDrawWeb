import React, { useEffect, useState } from 'react'
import cl from './imagesBlock.module.css'
import { Tooltip } from '@mui/material'
import canvasState from '../../../../store/canvasState.tsx'
import { observer } from 'mobx-react-lite'
import testMob from '../../../../store/neuralWindow.jsx'
import { imagesToBase64 } from '../parametrs/Parametrs/base64Converter.jsx'

const ImagesBlock = observer(({ closeWindow, setSendImages, sendImages }) => {
	const [imgWidthMax, setImgWidthMax] = useState(''); // максимально допустимая ширина изображения
	const [imgState, setImgState] = useState('NoImgNoNeuron');// состояние окна с картинками
	const [attention, setAttention] = useState(false); // наличие предупреждения

	const canvasImg = canvasState.getImgSrc(); // картинка из графического редактора
	const currentNeural = testMob.activeNeuralName // выбранная нейронка
	const images = testMob.neuralWindowImages; // картинки, которые лежали в хранилище
	const imgAmount = testMob.maxImageAmount; // допустимое количество картинок для текущей нейронки

	useEffect(() => {
		if (sendImages.length <= imgAmount) {
			setSendImages(images);

			if (canvasImg && sendImages.length < imgAmount) {
				setSendImages([...images, `${canvasImg}`])
			}
		}
	}, [canvasImg])

	useEffect(() => {
		selectImgMaxWidth(); // задаём максимальную ширину для блоков и картинок

		//если картинки есть, их количество не соответствует imgAmount для текущей нейронки, нейронка выбрана
		//и переходим с большего количества картинок на меньшее - предупреждение
		if (sendImages.length && sendImages.length !== imgAmount && currentNeural && !(imgAmount - sendImages.length >= 0))
			setAttention(true);
		else
			setAttention(false);

		//помещаем картинки в хранилище
		if (sendImages.length <= imgAmount) {
			testMob.setNeuralWindowImages([...sendImages]);
		}

		if (!currentNeural && !sendImages.length)
			setImgState("NoImgNoNeuron") // нейронка не выбрана, картинок нет

		else if (currentNeural && !sendImages.length)
			setImgState("NoImgNeuron") // нейронка выбрана, картинок нет

		else if (sendImages.length)
			setImgState("img") // есть картинки

	}, [currentNeural, sendImages])

	const handleFileInputChange = e => {
		let files = e.target.files;

		if (files.length <= imgAmount && (sendImages.length + files.length) <= imgAmount) {
			imagesToBase64(files)
				.then(result => {
					setSendImages([...sendImages, ...result])
				})
				.catch(err => {
					console.log("Произошла ошибка при попытке загрузить img")
					console.log(err);
				});
		} else {
			if (imgAmount)
				alert(`Максимально возможное количество загруженных картинок для текущей нейросети - ${imgAmount}`)
		}
	}

	const deletePicture = (index) => {
		sendImages.splice(index, 1) // удаляет 1 картинку с заданным индексом 
		setSendImages([...sendImages]) // сетит картинки для отправки на сервер
	}

	// меняем макс допустимую ширину для картинки и блока в зависимости от их количества в окне
	const selectImgMaxWidth = () => {
		if (sendImages.length === 1)
			setImgWidthMax(cl.img_1)

		if (sendImages.length === 2)
			setImgWidthMax(cl.img_2)

		if (sendImages.length === 3)
			setImgWidthMax(cl.img_3)

		if (sendImages.length === 4)
			setImgWidthMax(cl.img_4)
	}

	//создаём заданное количество блоков под картинки(рамочки с кнопкой "добавить картинку")
	const createPictureBlocks = (blocksQuantity) => {
		let quantityArr = [];

		if (blocksQuantity > 0)
			quantityArr = new Array(blocksQuantity).fill(1);

		return quantityArr.map((n, i) =>
			<div key={i} className={`${cl.imgBlock_1} ${imgWidthMax}`}>
				<Tooltip title='Загрузить с ПК' placement='top'>
					<label className={`${cl.imgBtn}`}>
						<img src='/neuralWindow/addImg.svg' alt='' />
						<input
							style={{ display: 'none', background: 'none' }}
							type='file'
							accept="image/png, image/jpeg, image/jpg"
							multiple={true}
							onChange={handleFileInputChange} />
					</label>
				</Tooltip>
			</div>)
	}

	//рендерим компонент в зависимости от его состояния
	switch (imgState) {
		case 'NoImgNoNeuron':
			return (<div className={cl.image}>
				<img className={cl.img_1} src='/neuralWindow/startImg.png' alt='' />

				<div className={cl.download}>
					<Tooltip title='Назад к редактору' placement='top'>
						<button className={cl.imgBtn} onClick={() => closeWindow()}>
							<img src='/neuralWindow/photoEdit.svg' alt='' />
						</button>
					</Tooltip>
					<Tooltip title='Загрузить с ПК' placement='top'>
						<label className={`${cl.imgBtn}`}>
							<img src='/neuralWindow/addImg.svg' alt='' />
							<input
								style={{ display: 'none', background: 'none' }}
								type='file'
								accept="image/png, image/jpeg, image/jpg"
								multiple={true}
								onChange={handleFileInputChange} />
						</label>
					</Tooltip>
				</div>
			</div>)
		case "NoImgNeuron":
			return <div className={cl.pictures}>
				{createPictureBlocks(imgAmount)}
			</div>
		case "img":
			return <div className={cl.pictures}>
				{attention &&
					<span className={cl.attentionTxt}> Допустимое количество изображений для данной нейросети - {imgAmount} </span>}

				{sendImages.map((img, i) =>
					<div key={i + 1} className={cl.picture}>
						<img className={`${cl.img_1} ${imgWidthMax}`} key={i} src={img} alt='' />
						<Tooltip title='Удалить' placement='top'>
							<button className={`${cl.imgBtn} ${cl.deleteBtn}`} onClick={() => { deletePicture(i) }}>
								<img src='/neuralWindow/deleteImg.svg' alt='' />
							</button>
						</Tooltip>
					</div>
				)}

				{Boolean(imgAmount - sendImages.length) && createPictureBlocks(imgAmount - sendImages.length)}
			</div>
		default:
	}
})

export default ImagesBlock