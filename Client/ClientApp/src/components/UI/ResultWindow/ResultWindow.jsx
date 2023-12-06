import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal } from '@mui/material'
import cl from './ResultWindow.module.css'
import ResultWindowState from './ResultWindowState.jsx'
import BabylonModule from '../BabylonModule/BabylonBtn'
import Tooltip from '@mui/material/Tooltip';

const ResultWindow = observer(() => {
	// const img = `data:image/png;base64,${ResultWindowState.getImages()}`
	const [width, setWidth] = useState(cl.img_1)
	const [images, setImages] = useState([])

	useEffect(() => {
		selectImgSize()
	}, [])

	useEffect(() => {
		if (ResultWindowState.images) {
			const images = ResultWindowState.getImages()?.map((img) => {
				return `data:image/png;base64,${img}`
			})

			setImages(images)
		}
	}, [ResultWindowState.images])


	// const images = ["/startPage/backGround.png", "/NGTU.png"]

	const selectImgSize = () => {
		console.log()
		if (images.length === 1)
			setWidth(cl.img_1)
		if (images.length === 2)
			setWidth(cl.img_2)
		if (images.length === 3)
			setWidth(cl.img_3)
		if (images.length === 4)
			setWidth(cl.img_4)
	}

	return (
		<Modal open={ResultWindowState.isOpen} className={cl.modalWindow} sx={{ border: '2px solid #000' }}>
			<div className={cl.modal}>
				<header className={cl.header}>
					<button className={cl.closeBtn} onClick={() => ResultWindowState.setIsOpen(false)}>
						<img className={cl.closeImg} src='Close.svg' alt='' />
					</button>
				</header>
				<main className={cl.main}>
					<section className={cl.imgResult}>
						{
							Boolean(images && images?.length && images[0]) && images?.map((img, i) =>
								<div className={cl.picture}>
									<img key={i} className={`${cl.img_main} ${width}`} src={img} alt='' onError={() => console.error(`Error loading image: ${img}`)} />
									<Tooltip title='Скачать' placement='top'>
										<a key={i + 1} className={cl.downloadImg}
											href={img}
											download="StableDrawImg"
											target="_blank"
											rel="noreferrer"
											style={{ textDecoration: 'none' }}
										>
											<img className={cl.downloadPct} src="./download.png" alt="" />
										</a>
									</Tooltip>
								</div>
							)

						}
					</section>
					<section className={cl.navigate}>
						<BabylonModule images={images} />
						<button
							className={cl.goToCanvas}
							onClick={() => ResultWindowState.setIsOpen(false)}
						>
							<span className={cl.txt}>
								Назад к редактору
							</span>
						</button>


					</section>
				</main>
			</div>
		</Modal>
	)
})

export default ResultWindow