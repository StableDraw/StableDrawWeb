import React from 'react';
import cl from '../Pay.module.css';
import {Checkbox} from '@mui/material';
import { cyan } from '@mui/material/colors';

function Agreement(props) {

  return (
      <div className={cl.agreeContent}>
        <Checkbox checked={props.checked ? 1:0} sx={{color: cyan[800],'&.Mui-checked': {color: cyan[600],},fontSize:30}} onChange={props.handleChange}/>
         <div className={cl.agreeText}> Продолжая оформление заказа, я соглашаюсь с условиями
         <a href="AgreementWindow" target="_blank" className={cl.agreeText}> Пользовательского соглашения</a> , включающей условия обработки персональных данных
         </div>
      </div>
  );
};

export default Agreement;