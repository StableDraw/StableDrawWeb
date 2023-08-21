import React from 'react';
import cl from '../Pay.module.css';
import { cyan } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

function CheckList() {
  return (
      <div className={cl.checkList}>
        <div className={cl.check}>
            <Checkbox  sx={{color: cyan[800],'&.Mui-checked': {color: cyan[600],},fontSize:30}} defaultChecked/>
           <div className={cl.text_in_check}> Дополнительные участники </div>
        </div>

        <div className={cl.check}>
           <Checkbox  sx={{color: cyan[800],'&.Mui-checked': {color: cyan[600],},fontSize:30}} defaultChecked/>
           <div className={cl.text_in_check}> Дополнительные 3D Модели </div>
        </div>
        <div className={cl.check}>
           <Checkbox  sx={{color: cyan[800],'&.Mui-checked': {color: cyan[600],},fontSize:30}} defaultChecked/>
           <div className={cl.text_in_check}> Загрузка своих 3D моделей </div>
        </div>
        <div className={cl.check}>
           <Checkbox  sx={{color: cyan[800],'&.Mui-checked': {color: cyan[600],},fontSize:30}} defaultChecked/>
           <div className={cl.text_in_check}> При приобретении первого месяца подписки 3 бесплатные 3D модели </div>
        </div>
           
      </div>
  );
};

export default CheckList;