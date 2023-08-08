import React from 'react';
import cl from './ScaleField.module.css'
const ScaleField = () => {
    return (
        <div className={cl.scale_field}>
            <input type="text" className={cl.f_ratio} list="default_ratio" name="f_ratio" required placeholder="W:H" />
            <datalist id="default_ratio">
                <option value="16:9"></option>
                <option value="1:1"></option>
                <option value="21:9"></option>
                <option value="4:3"></option>
                <option value="9:16"></option>
                <option value="9:21"></option>
            </datalist>
        </div>
    );
};

export default ScaleField;