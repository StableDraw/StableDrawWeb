import React, {useState} from 'react';
import cl from "./AboutUs1.module.css";
import "./AboutUs1.module.css";
const PhotoSlider = ({data}) => {
    const [activeId, setActive] = useState(0)

    const prev = () => {
        setActive(activeId => {
            if (activeId > 0) {
                return activeId - 1
            }
            return activeId
        })
    }

    const next = () => {
        setActive(activeId => {
            if (activeId < data.length - 1) {
                return activeId + 1
            }
            return activeId
        })
    }

    return (
        <div className={cl.slider}>
            <div className={`${activeId===0 ? cl.left_disabled : cl.left}`} onClick={prev}/>
            {data.map((photo, iD) => (
                <div
                    className={`${iD === activeId ? cl.slide_active : cl.slide}`}
                >
                    <img src={photo.img} alt={`Slide ${iD + 1}`} />
                </div>
            ))}
            <div className={`${activeId===data.length - 1 ? cl.right_disabled : cl.right}`} onClick={next}/>
        </div>
    );
};

export default PhotoSlider;