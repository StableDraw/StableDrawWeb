import React from 'react';
import cl from '../Pay.module.css';
import CheckIcon from '@mui/icons-material/Check';

function CheckList() {
    return (
        <div className={cl.checkList}>
            <div className={cl.check}>
                <CheckIcon color="success" sx={{ fontSize: 30 }}/>
                <div className={cl.text_in_check}> hfhflshf </div>
            </div>
            <div className={cl.check}>
                <CheckIcon color="success" sx={{ fontSize: 30 }}/>
                <div className={cl.text_in_check}> hfhflshf </div>
            </div>
            <div className={cl.check}>
                <CheckIcon color="success" sx={{ fontSize: 30 }}/>
                <div className={cl.text_in_check}> hfhflshf </div>
            </div>
            <div className={cl.check}>
                <CheckIcon color="success" sx={{ fontSize: 30 }}/>
                <div className={cl.text_in_check}> hfhflshf </div>
            </div>

        </div>
    );
};

export default CheckList;