import React, { useEffect, useState } from 'react'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'
import store from '../../../../../store/neuralWindow.jsx'
import ResultWindowState from '../../../ResultWindow/ResultWindowState.jsx'
import { observer } from 'mobx-react-lite'
import ImagesBlock from '../../imagesBlock/imagesBlock.jsx'
import Caption from '../Caption/Caption.tsx'
import { base64ToBlob } from './base64Converter.jsx'
import { ParamSwitch } from './paramSwitch.jsx'
import Manual from '../Manual/Manual.jsx'

function setSendImgArray(ImgFilesBase64) {
	let binaryToSend = []
	ImgFilesBase64.forEach((file) => {
		binaryToSend.push(base64ToBlob(file))
	})

	return binaryToSend
}

const Parametrs = observer(({ closeWindow, closeParam, }) => {
	const [img, setImg] = useState([]); // массив картинок для отправки на сервер
	const [attention, setAttention] = useState(''); // предупреждение о невалидности параметров для отправки на сервер
	const [searchValue, setSearchValue] = useState('')

	const paramsToRender = store.parametrs
	const isCaption = store.isCaption
	let renderValue = store.defaultValue
	const neuralName = store.activeNeuralName

	useEffect(() => {
		if (store.caption && isCaption)
			setAttention('')
	}, [store.caption])

	useEffect(() => {
		if (img.length)
			setAttention('')
	}, [img])

	const sendValuesForRender = (value, str) => {
		renderValue = ({ ...renderValue, [str]: value })
	}

	const startGeneration = () => {
		// проверка наличия описания
		if ((isCaption && !store.caption)) {
			setAttention('*Введите описание для модели')
			return;
		}
		//проверка наличия изображения
		if (!img.length) {
			setAttention('*Добавьте изображение для генерации')
			return;
		}

		goOnServer()
		store.startGeneration()
	}

	const goOnServer = async () => {
		const formData = new FormData();
		let binary = setSendImgArray(img)
		formData.append('NeuralType', neuralName);
		formData.append('Parameters', JSON.stringify(renderValue));
		formData.append('Caption', store.caption);
		formData.append('Prompts', ["", ""]) //надо узнать че это такое
		binary.forEach((file) => {
			formData.append(`ImagesInput`, file)
		})

		try {
			const response = await api.RunNeural(formData);
			const images = response.data.images;
			store.endGeneration();

			if (images) {
				store.endGeneration();
				ResultWindowState.setImages(images);
				ResultWindowState.setIsOpen(true);
			} else {
				console.log(response);
				alert("При генерации возникла ошибка");
			}
		} catch (e) {
			alert("Произошла ошибка сервера");
			store.endGeneration();
			console.error(e);
			throw (e);
		}
	}

	const getSearchValue = (e) => {
		setSearchValue(e.target.value)
	}

	const getSearchResult = () => {
		return paramsToRender.filter((param) => {
			const paramSystemName = Object.keys(param)
			return param[paramSystemName[0]].name.toLowerCase().includes(searchValue.toLowerCase())
		})
	}

	return (
		<div>
			<ImagesBlock closeWindow={closeWindow} closeParam={closeParam} setSendImages={setImg} sendImages={img} />
			{neuralName ? <>
				<div className={cl.params}>
					<div className={cl.paramsHeader}>
						<input
							onChange={getSearchValue}
							type='text'
							placeholder='Найти параметры...'
							className={cl.findParam}
						/>
						<button className={cl.saveParam}>
							<span className={`${cl.txt} ${cl.txt__saveParam}`}>Сохранить параметры</span>
						</button>
					</div>
					<div className={cl.paramCont}>
						<div className={cl.paramsList}>
							{isCaption ? <Caption /> : undefined}
							{
								searchValue.length > 1 ? getSearchResult().map((param, id) =>
									<ParamSwitch key={id} value={param} id={id} setValueForServer={sendValuesForRender} />)
									:
									paramsToRender.map((param, id) =>
										<ParamSwitch key={id} value={param} id={id} setValueForServer={sendValuesForRender} />)
							}
						</div>
					</div>
				</div>
				<div className={cl.downBtns}>
					<button onClick={() => store.endGeneration()} className={cl.cancel}>
						<span className={cl.cancel__txt}>
							Отмена
						</span>
					</button>
					{
						store.isGenerationEnd ?
							<div className={cl.attention}>
								<button className={cl.downBtns__generate} onClick={startGeneration}>
									<span className={cl.txt}>
										Сгенерировать
									</span>
								</button>
								{attention && <span className={cl.attentionTxt}>
									{attention}
								</span>}
							</div>
							:
							<div className={`${cl.downBtns__generate} ${cl.loadingMode}`}>
								<span className={cl.txt}> Идёт генерация...</span>
								<div className={cl.loading}>
									<div className={cl.spin}>
									</div>
								</div>
							</div>
					}
				</div>
			</> :
			<Manual/>
				}
		</div>
	)
})

export default Parametrs




