import React from 'react';
import cl from '../Pay.module.css';
import {Checkbox} from '@mui/material';

function Agreement(props) {

    return (
        <div className={cl.agreeContent}>
            <Checkbox checked={props.checked} onChange={props.handleChange}/>
            <div className={cl.agreeText}> Продолжая оформление заказа, я соглашаюсь с условиями
                <a href="AgreementWindow" target="_blank"> Пользовательского соглашения</a> , включающей условия обработки персональных данных
            </div>
        </div>
    );
};

export default Agreement;