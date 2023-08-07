import React, { Component } from 'react';

export class PhototoImg extends Component
{
    static displayName = PhototoImg.name;

    render()
    {

        return (
            <div>
                 <h1>Анимация по кадрам</h1>

                 <p>К сожалению, этот режим пока не реализован.</p>

                 <a href="drawing-to-img">Обработать фото в редакторе</a>
            </div>
        );
    }
}