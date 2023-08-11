import React, { Component } from 'react';

export class FramestoAnimation extends Component
{
  static displayName = FramestoAnimation.name;

    render()
    {
        return (
            <div>
                 <h1>Анимация по кадрам</h1>

                 <p>К сожалению, этот режим пока не реализован</p>

                 <a href="drawing-to-img">Вернуться к редактору</a>
            </div>
        );
    }
}