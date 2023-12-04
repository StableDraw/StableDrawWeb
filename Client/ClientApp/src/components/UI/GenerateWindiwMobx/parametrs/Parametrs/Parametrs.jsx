import React, { useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'
import testMob from '../../../../../store/neuralWindow.jsx'
import ResultWindowState from '../../../ResultWindow/ResultWindowState.jsx'
import { observer } from 'mobx-react-lite'
import DownloadImg from './DownloadImg'
import Caption from '../Caption/Caption.tsx'

const renderSwitch = (value, id, func) => {
	const key = Object.keys(value); //название параметра(системное)

	//задаёт массивы дочерних параметров и значений селекторов в зависимости от текущей модели/версии
	const setChild = (currentModel) => {
		if ((key[0] === "model" || key[0] === "version")) {
			value[key].values.map((model) => {
				if (model.value === currentModel && Object.hasOwn(model, "childs")) {
					model.childs.map((child) => {
						testMob.setChildParams(child.param_id)
						testMob.setChildValues(child.values_id)
					})
				} else if (!Object.hasOwn(model, "childs") && model.value === currentModel) {
					testMob.clearChildParams();
				}
			})
		}
	}

	//возвращает false, если у параметра есть свойство child и при этом его нет в массиве дочерних параметров к текущей модели
	const isValid = () => {
		return !(!testMob.childParams.includes(key[0]) && Boolean(value[key]?.child))
	}

	if (!Object.hasOwn(value[key], "system")) {
		const type = value[key].type;
		switch (type) {
			case 'select':
				return <MySelect
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					options={value[key].values}
					description={value[key].description}
					getValue={func}
					setChild={setChild} />
			case 'text':
				return <InputText
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					description={value[key].description}
					getValue={func}
					isValidParam={isValid}
				/>
			case 'range':
				return <InputRange
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default}
					step={value[key].step}
					min={value[key].min}
					max={value[key].max}
					description={value[key].description}
					getValue={func}
					isValidParam={isValid}
				/>
			case 'boolean':
				return <MyCheckBox
					key={id}
					keyValue={key}
					name={value[key].name}
					defaultV={value[key].default === 'True' ? true : false}
					description={value[key].description}
					getValue={func}
					isValidParam={isValid}
				/>
			default:
		}
	}
}

function dataURItoBlob(dataURLs) {
	let blobs = [];

	if (dataURLs) {
		dataURLs.forEach(dataURL => {
			if (dataURL.split(',')[0].indexOf('base64') >= 0) {
				const byteString = atob(dataURL.split(',')[1]);
				const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

				let ia = new Uint8Array(byteString.length);

				for (let i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}

				blobs.push(new Blob([ia], { type: mimeString }));
			}
		})
		return blobs;
	}}

	const Parametrs = observer(({ closeWindow, closeParam, }) => {
		const [img, setImg] = useState([]);

		const paramsToRender = testMob.parametrs
		const isCaption = testMob.caption
		let renderValue = testMob.defaultValue
		const neuralName = testMob.activeNeuralName
		let caption = ''
		const currentModel = testMob.currentModel;

		const closeModal = () => {
			closeWindow(false)
			closeParam(false)
			testMob.setActiveNeural('')
			testMob.endGeneration();
		}

		const setCaption = (value) => {
			caption = value
		}

		const sendValuesForRender = (value, str) => {
			renderValue = ({ ...renderValue, [str]: value })
			// console.log("awdawdawd", renderValue)
		}

		const goOnServer = async () => {
			const formData = new FormData();
			let blobs = dataURItoBlob(img);
			formData.append('NeuralType', neuralName);
			formData.append('Parameters', JSON.stringify(renderValue));
			formData.append('Caption', caption);
			formData.append('Prompts', ["", ""])//надо узнать че это такое
			formData.append('ImagesInput', blobs);
			try {
				const response = await api.RunNeural(formData);
				const images = response.data.images;
				testMob.setActiveNeural('');
				closeModal();
				ResultWindowState.setImages(images);
				ResultWindowState.setIsOpen(true);
				testMob.endGeneration();
			} catch (e) {
				alert("При генерации возникла ошибка");
				testMob.endGeneration();
				console.error(e);
				throw (e);
			}
		}
		return (
			<div>
				<DownloadImg closeWindow={closeWindow} closeParam={closeParam} setSendImages={setImg} sendImages={img} />
				<div className={cl.params}>
					<div style={{ display: 'flex' }}>
						<input
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
							{isCaption ? <Caption setCaption={setCaption} /> : undefined}
							{paramsToRender.map((param, id) => renderSwitch(param, id, sendValuesForRender, currentModel))}
						</div>
					</div>
				</div>
				<div className={cl.downBtns}>
					<button onClick={() => closeModal()} className={cl.cancel}>
						<span className={cl.cancel__txt}>
							Отмена
						</span>
					</button>
					{
						testMob.isGenerationEnd ?
							<button className={cl.downBtns__generate} onClick={() => { testMob.startGeneration(); goOnServer() }}>
								<span className={cl.txt}>
									Сгенерировать
								</span>
							</button> :
							<div className={`${cl.downBtns__generate} ${cl.loadingMode}`}>
								<span className={cl.txt}> Идёт генерация...</span>
								<div className={cl.loading}>
									<div className={cl.spin}>
									</div>
								</div>
							</div>
					}

				</div>
			</div>
		)
	})

	export default Parametrs




