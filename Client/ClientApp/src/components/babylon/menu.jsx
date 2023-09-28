import React from "react";
import loadClasses from './stylesDark/loadTex.module.css';
import loadClassesLight from './stylesLight/loadTex.module.css';
import mainClass from './stylesDark/main.module.css';
import mainClassLight from './stylesLight/main.module.css';
import { SelectTexMenu } from "./selectTexMenu";
import { useState, useEffect, useMemo } from "react";
import api from '../../api/api';


export const Menu = ({ setCurrenTexture, canvasTextures, isLightTheme, }) => {
	const [textureStorage, setTextureStore] = useState([]);
	const [texCount, setTexCount] = useState(0);
	const [InputKey, setInputKey] = useState(0);

	useEffect(() => {
		const getTexStorage = async () => {
			await api.GetTextureStorage()
				.then(res => {
					if (res.data) {
						setTextureStore(res.data);
					}
				})
				.catch(err => console.log('Ошибка подключения к хранилищу: ', err));
		};
		getTexStorage();
	}, []);

	useMemo(() => {
		setTextureStore([...textureStorage, ...canvasTextures]);
		setTexCount(textureStorage.length)
	},
		[canvasTextures]);

	const Send = async (img) => {
		try {
			const data = await api.LoadTexture(img);
			setTextureStore([...textureStorage, data.data]);
			setCurrenTexture(data.data.bytes);
			setTexCount(textureStorage.length);
			return data;
		} catch (e) {
			console.log('error loading texture');
			console.error(e);
			throw e;
		}
	}

	async function cleanTexStorage() {
		await api.DeleteAllTextures()
			.then(() => { setTextureStore([]); setCurrenTexture('') })
			.catch(err => console.log('Ошибка очистки хранилища: ', err))
	}

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", "multipart/form-data");
		Send(formData);

		setInputKey(InputKey + 1);
	};

	return (
		<>
			<div className={loadClasses.cont}>
				{Boolean(textureStorage.length) &&
					<div className={loadClassesLight.sideMenu}>
						<div className={isLightTheme ? loadClassesLight.addTexSmall : loadClasses.addTexSmall}>
							<label className={isLightTheme ? mainClassLight.inputLabel : mainClass.inputLabel} htmlFor="file-input">
								<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
									<g clip-path="url(#clip0_307_4)">
										<path d="M29.75 14C29.2859 14 28.8407 14.1844 28.5126 14.5126C28.1844 14.8408 28 15.2859 28 15.75V21.665L25.41 19.075C24.4955 18.1677 23.2595 17.6586 21.9713 17.6586C20.683 17.6586 19.447 18.1677 18.5325 19.075L17.3075 20.3175L12.9675 15.96C12.053 15.0527 10.817 14.5436 9.52875 14.5436C8.24053 14.5436 7.00451 15.0527 6.09 15.96L3.5 18.5675V8.75C3.5 8.28587 3.68437 7.84075 4.01256 7.51256C4.34075 7.18437 4.78587 7 5.25 7H19.25C19.7141 7 20.1592 6.81563 20.4874 6.48744C20.8156 6.15925 21 5.71413 21 5.25C21 4.78587 20.8156 4.34075 20.4874 4.01256C20.1592 3.68437 19.7141 3.5 19.25 3.5H5.25C3.85761 3.5 2.52226 4.05312 1.53769 5.03769C0.553124 6.02226 0 7.35761 0 8.75V30.135C0.00461135 31.4239 0.518653 32.6586 1.43002 33.57C2.34139 34.4813 3.57614 34.9954 4.865 35H26.635C27.1092 34.9962 27.5805 34.9255 28.035 34.79C29.0455 34.5066 29.9351 33.8994 30.5674 33.0617C31.1996 32.224 31.5395 31.202 31.535 30.1525V15.75C31.535 15.5172 31.4886 15.2868 31.3985 15.0721C31.3084 14.8575 31.1764 14.663 31.0101 14.5C30.8439 14.3371 30.6468 14.2089 30.4304 14.123C30.2141 14.0372 29.9827 13.9953 29.75 14ZM5.25 31.5C4.78587 31.5 4.34075 31.3156 4.01256 30.9874C3.68437 30.6592 3.5 30.2141 3.5 29.75V23.5025L8.5575 18.445C8.81326 18.1907 9.1593 18.0479 9.52 18.0479C9.8807 18.0479 10.2267 18.1907 10.4825 18.445L23.555 31.5H5.25ZM28 29.75C27.9888 30.0889 27.8793 30.4172 27.685 30.695L19.775 22.75L21.0175 21.525C21.143 21.3969 21.2927 21.2952 21.458 21.2258C21.6233 21.1563 21.8007 21.1206 21.98 21.1206C22.1593 21.1206 22.3367 21.1563 22.502 21.2258C22.6673 21.2952 22.817 21.3969 22.9425 21.525L28 26.6175V29.75ZM33.25 3.5H31.5V1.75C31.5 1.28587 31.3156 0.840752 30.9874 0.512563C30.6592 0.184374 30.2141 0 29.75 0C29.2859 0 28.8407 0.184374 28.5126 0.512563C28.1844 0.840752 28 1.28587 28 1.75V3.5H26.25C25.7859 3.5 25.3407 3.68437 25.0126 4.01256C24.6844 4.34075 24.5 4.78587 24.5 5.25C24.5 5.71413 24.6844 6.15925 25.0126 6.48744C25.3407 6.81563 25.7859 7 26.25 7H28V8.75C28 9.21413 28.1844 9.65925 28.5126 9.98744C28.8407 10.3156 29.2859 10.5 29.75 10.5C30.2141 10.5 30.6592 10.3156 30.9874 9.98744C31.3156 9.65925 31.5 9.21413 31.5 8.75V7H33.25C33.7141 7 34.1592 6.81563 34.4874 6.48744C34.8156 6.15925 35 5.71413 35 5.25C35 4.78587 34.8156 4.34075 34.4874 4.01256C34.1592 3.68437 33.7141 3.5 33.25 3.5Z" fill={isLightTheme ? "#656565" : '#BDBABA'} />
									</g>
									<defs>
										<clipPath id="clip0_307_4">
											<rect width="35" height="35" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</label>
							<input
								key={InputKey}
								id="file-input"
								type="file"
								hidden
								multiple={true}
								onChange={handleFileChange}
							/>
						</div>
						<div onClick={cleanTexStorage} className={isLightTheme ? loadClassesLight.addTexSmall : loadClasses.addTexSmall}>
							<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
								<g clip-path="url(#clip0_307_10)">
									<path d="M9.92857 35.1111C9.92857 37.2597 11.6546 39 13.7857 39H29.2143C31.3454 39 33.0714 37.2597 33.0714 35.1111V11.7778H9.92857V35.1111ZM35 5.94444H28.25L26.3214 4H16.6786L14.75 5.94444H8V9.83333H35V5.94444Z" fill={isLightTheme ? "#656565" : '#BDBABA'} />
								</g>
								<defs>
									<clipPath id="clip0_307_10">
										<rect width="44" height="44" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</div>
					</div>
				}
				<SelectTexMenu
					setTextureStore={setTextureStore}
					send={Send}
					textureStorage={textureStorage}
					texCount={texCount}
					setTexCount={setTexCount}
					setCurrenTexture={setCurrenTexture}
					isLightTheme={isLightTheme}
				/>
			</div>
		</>
	);
}