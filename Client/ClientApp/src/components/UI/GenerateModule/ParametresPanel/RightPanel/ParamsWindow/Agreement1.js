import React from 'react';
import cl from './Agreement1.module.css';
import {Checkbox} from '@mui/material';
const Agreement1 = (props) => {
    return (
        <div className={cl.agreeContent}>
            <Checkbox
                style={{marginLeft: 110}}
                checked={props.checked}
                onChange={props.handleChange}
            />
        </div>
    );
};

export default Agreement1;