import React from 'react';
import cl from '../Pay.module.css';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Menu = () => {

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', alignself: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5, fontSize: 20}}  />
                    Home
                </Link>
                <Link>
                    <AttachMoneyIcon sx={{ mr: 0.5, fontSize: 20}} />
                    Pay
                </Link>

            </Breadcrumbs>

        </div>
    )
};

export default Menu;