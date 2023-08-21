import React from 'react';
import cl from '../Pay.module.css';
import Button from '@mui/material/Button';

function Content1() {
  return (
      <div className={cl.content_box1}>
          <header className={cl.hederText}> Представляем уникальную подписку для корпоративных клиентов:</header>
          <div className={cl.contentText}> Цена: 49 900 рублей для 5 человек.</div>
          <div className={cl.contentText}> Дополнительные участники: +5 000 рублей каждый.</div>
          <div className={cl.contentText}> Дополнительные 3D модели: 5 000 рублей за штуку.</div>
          <div className={cl.contentText}> Загрузка собственных 3D моделей: 1 000 рублей.</div>
          <div className={cl.contentText}> Эффективно используйте творческий потенциал вашей команды с нашей подпиской.</div>
      </div>
  );
};

export default Content1;