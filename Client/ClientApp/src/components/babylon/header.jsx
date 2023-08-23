import React from "react";
import { Link } from "react-router-dom";
import { Button, AppBar, Box, Toolbar, Typography } from '@mui/material';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import headerClasses from './stylesDark/appBar.module.css';
import headerClassesLight from './stylesLight/appBar.module.css';
import Switch from '@mui/joy/Switch'
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { themeDark, themeLight, themeDarkHeader } from "./customThemes";


export const Header = ({ setTheme, isLightTheme }) => {


	return (
		<AppBar sx={{borderBottom:'1px solid rgba(128, 128, 128, 0.514)'}} theme={isLightTheme ? themeLight : themeDarkHeader }
		position="static">
			<Toolbar  theme={isLightTheme ? themeLight : themeDark }
			// className={isLightTheme ? headerClassesLight.appBar : headerClasses.appBar}
			>
				<Typography className={headerClasses.txt}>StableDraw</Typography>
				<Box sx={{ flexGrow: 1 }}></Box>
				<div className={headerClasses.themeToggle}>
					{isLightTheme ? <Brightness2OutlinedIcon sx={{ height: '50px', width: '30px' }} /> : <Brightness2RoundedIcon sx={{ height: '50px', width: '30px' }} />}
					<Switch
						onChange={() => { setTheme(!isLightTheme) }}
						slotProps={{
							track: {
								children: (
									<React.Fragment>
										<Typography sx={{ fontSize: '14px' }}>Light</Typography>
										<Typography sx={{ fontSize: '14px' }}>Dark</Typography>
									</React.Fragment>
								),
								sx: {
									justifyContent: 'flex-start',
									gap: '8px',
									padding: '5px'
								},
							},
						}}
						sx={{
							'--Switch-thumbSize': '36px',
							'--Switch-trackWidth': '80px',
							'--Switch-trackHeight': '30px'
						}}
					/>
					{isLightTheme ? <WbSunnyRoundedIcon sx={{ height: '50px', width: '30px' }} /> : <WbSunnyOutlinedIcon sx={{ height: '50px', width: '30px' }} />}
				</div>

			</Toolbar>
		</AppBar>
	)
}