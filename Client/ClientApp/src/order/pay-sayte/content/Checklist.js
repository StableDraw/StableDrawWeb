import React from 'react';
import cl from '../Pay.module.css';
import CheckIcon from '@mui/icons-material/Check';

function CheckList() {
  return (
      <div className={cl.checkList}>
        <div className={cl.check}>
           <CheckIcon color="success" sx={{ fontSize: 30 }}/>
           <div className={cl.text_in_check}> Дополнительные участники </div>
        </div>
        <div className={cl.check}>
           <CheckIcon color="success" sx={{ fontSize: 30 }}/>
           <div className={cl.text_in_check}> Дополнительные 3D Модели </div>
        </div>
        <div className={cl.check}>
           <CheckIcon color="success" sx={{ fontSize: 30 }}/>
           <div className={cl.text_in_check}> Загрузка своих 3D моделей </div>
        </div>
        <div className={cl.check}>
           <CheckIcon color="success" sx={{ fontSize: 30 }}/>
           <div className={cl.text_in_check}> При приобретении первого месяца подписки 3 бесплатные 3D модели </div>
        </div>
           
      </div>
  );
};

export default CheckList;