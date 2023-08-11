import React from "react";
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import headerClasses from './styles/appBar.module.css';



export const Header = () => {


	return (
		<AppBar position="static">
				<Toolbar >
					<Box sx={{ flexGrow: 1 }}></Box>
				</Toolbar>
			</AppBar>
	)
}