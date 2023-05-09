import React, { Component } from 'react';

export class TexttoImg extends Component
{
    static displayName = TexttoImg.name;

    render()
    {
        return (
            <div>
                <h1>Анимация по кадрам</h1>

                <p>К сожалению, этот режим в отдельном виде пока нереализован.</p>

                <a href= "drawing-to-img">Генерация по тексту есть в редакторе</a>
            </div>
        );
    }
}