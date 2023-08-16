import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Text from './Text';
const Content = () => {
    return (
        <div className={cl.contentBox}>
            <Text/>
            <div className={cl.buyBtn}>
                <Box display="flex" justifyContent="center">
                    <Link to="/Pay">
                        <Button  variant="contained" disableElevation >
                            Приобрести сейчас
                        </Button>
                    </Link>
                </Box>
            </div>
        </div>
    );
};

export default Content;