import React, {useState} from 'react';
import cl from './LeftPanel.module.scss';
export const NeuronObject = ({name, images, description}) => {
    const [active, setActive] = useState(false)
    const showActive = () => {
        setActive(!active)
    }
    return (
        <div className={cl.neuronItem} style={{background: active ? "#ff0000" : "#D9D9D9"}}
             onClick={showActive}>
            <img className={cl.neuronItem__big} src={images[0]} alt="Item"/>
            <h3>{name}</h3>
            <h4>{description}</h4>
        </div>
    );
};



