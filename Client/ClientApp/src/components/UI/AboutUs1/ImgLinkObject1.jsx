import React from 'react';
import cl from "./AboutUs1.module.css";

export const ImgLinkObject1 = ({ href, img, name}) => {
    return (
        <a
            className={cl.img_link}
            href={href}
        >
            <img
                className={cl.img}
                alt={name}
                src={img}
            >
            </img>
        </a>
    )
};