import React, {useState} from 'react';
import cl from './ColorMenu.module.css'
import ToolButton from "../../Toolbar/ToolButton";
import MyInput from '../../MyInput/MyInput';

const ColorMenu = () => {
    const [modal, setModal] = useState(false)

    const rootClass = [cl.myModal]

   /* const initial_picker = $(function () {
        let picker = $("#picker");
*/

    const initial_picker = (function () {
        let picker = ("#picker");

        picker.farbtastic("#color");
    });
    if(modal) {
        rootClass.push(cl.clr_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'palette.png'} visible={modal} setVisible={setModal} title={'Выбор цвета'}/>
            <div className={rootClass.join(' ')} id="clr_window">
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