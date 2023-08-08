import React from "react";
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import headerClasses from './styles/appBar.module.css';



export const Header = ({showSceneBar, showModelsBar}) => {


	return (
		<AppBar position="static">
				<Toolbar >
					<Box sx={{ flexGrow: 1 }}></Box>
					<div className={headerClasses.buttonContainer}>
						<Button
							color="inherit"
							onClick={showModelsBar}
							endIcon={<ViewInArOutlinedIcon />}>
							Select model
						</Button>
						<Button
							color="inherit"
							onClick={showSceneBar}
							endIcon={<AspectRatioIcon />}>
							Select scene
						</Button>
					</div>
				</Toolbar>
			</AppBar>
	)
}