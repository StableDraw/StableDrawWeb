import React from "react";
import { IconButton } from '@mui/material';
import { Button, Typography } from '@mui/material';
import loadClasses from './styles/loadTex.module.css';
import CancelIcon from '@mui/icons-material/Cancel';

export const SelectTexMenu = ({
	currenTexture = [],
	texCount,
	setTexCount,
	deleteTex, 
}) => {


	return (
		<div className={loadClasses.selectTexMenu}>
			<div className={loadClasses.buttons_selectTexMenu}>
				<div className={loadClasses.selectTexMenu}>
					<div className={loadClasses.previewTexes_selectTexMenu}>
						{currenTexture.map((tex, index) =>
							<div className={loadClasses.buttons_selectTexMenu} key={tex + index + index}>
								<div className={loadClasses.closeButton_selectTexMenu} key={tex + index + tex}>
									<IconButton
										key={tex + index}
										sx={{ width: '20px', height: '20px', }}
										onClick={() => { deleteTex(tex) }} >
										<CancelIcon
											key={index + tex + index + tex}
											color="black"
											sx={{ width: '20px', height: '20px' }} />
									</IconButton>
								</div>
								<Button onClick={() => setTexCount(index)} key={tex + tex}>
									<div key={tex + index}>
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
				</div>
			</div>
		</div>


	)
}