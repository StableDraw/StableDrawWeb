import React, {useState} from 'react';
import cl from './ColorMenu.module.css'
const ColorMenu = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal2]
    const initial_picker = (function () {
        let picker = ("#picker");
        picker.farbtastic("#color");
    });
    if(modal) {
        rootClass.push(cl.clr_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <div className="cursor">
                <img className="cursimg" alt="cursimg" style={{ width: "30px", height: "30px" }}></img>
            </div>
            <button className="up_panel_button" id="palette" title="Выбор цвета" onClick={()=>setModal(true)}>
                <img className="up_panel_button_image" id="clrimg" alt="palette.png" src="palette.png" />
            </button>
            <div className={rootClass.join(' ')} id="clr_window" onClick={() => setModal(false)}>
            <form action="">
                <div className="form-item">
                    <label id="text_label_clr" htmlFor="color">
                        Цвет:
                    </label>
                    <input type="text" id="color" name="color" defaultValue="#000000"></input>
                </div>
                <div id="picker"></div>
            </form>
            <button className={cl.ctype_clr_btn} id="ctype_clr_btn" type="button">
                Цвет фона
            </button>
            <button className={cl.ok_clr_btn} id="ok_clr_btn" type="button">
                Сохранить
            </button>
            </div>
        </div>
    );
};

export default ColorMenu;