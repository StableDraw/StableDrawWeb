import React from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import loadClasses from './styles/loadTex.module.css';

export const SelectTexMenu = ({
	currenTexture = [],
	changeTextureDown,
	changeTextureUp,
	texCount,
	setTexCount,
	deleteTex }) => {


	return (
		<div className={loadClasses.selectTexMenu}>
			<IconButton onClick={changeTextureDown}>
				<KeyboardArrowLeftIcon />
			</IconButton>
			<div className={loadClasses.previewTexes_selectTexMenu}>
				{currenTexture.map((tex, index) =>
					<div className={loadClasses.buttons_selectTexMenu}>
						<div className={loadClasses.closeButton_selectTexMenu}>
							<IconButton
								sx={{ width: '15px', height: 'auto' }}
								onClick={() => { deleteTex(tex) }} >
								<CloseIcon
									sx={{ width: '15px', height: 'auto' }} />
							</IconButton>
						</div>
						<Button onClick={() => setTexCount(index)}>
							<div >
								<img src={tex}
									alt="texture"
									className={loadClasses.texImg_selectTexMenu}
									style={{ border: index === texCount ? '3px solid #1976d2' : 'none' }}
									key={tex} />
							</div>
						</Button>
					</div>
				)}
			</div>
			<IconButton onClick={changeTextureUp}>
				<KeyboardArrowRightIcon />
			</IconButton>
		</div>
	)
}