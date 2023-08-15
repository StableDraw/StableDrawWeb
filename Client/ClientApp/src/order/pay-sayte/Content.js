import React from 'react';
import cl from './Pay.module.css';
import Content_head from './Content1';
import Content1 from './Content1';
import Content2 from './Content2';

function Content() {
    return (
        <div>
            <div className={cl.content_box1}>
                <Content1/>
            </div>

            <div className={cl.content_box2}>
                <Content2/>
            </div>
        </div>
    );
};

export default Content;