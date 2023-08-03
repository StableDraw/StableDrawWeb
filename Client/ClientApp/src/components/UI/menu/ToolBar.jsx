import React from 'react';

const ToolBar = () => {
    
    return (
        <div className="nav">
            <div className="icon_buttons">
                <button className="up_panel_button" id="arrow_back" title={"Отменить"}>
                    <img className="up_panel_button_image" id="arrow_back_image" alt="undo_arrow.png" src="undo_arrow.png"></img>
                </button>
                <button className="up_panel_button" id="arrow_next" title="Повторить">
                    <img className="up_panel_button_image" id="arrow_next_image" alt="repeat_arrow.png" src="repeat_arrow.png"></img>
                </button>
                <button className="up_panel_button" id="palette" title="Выбор цвета">
                    <img className="up_panel_button_image" id="clrimg" alt="palette.png" src="palette.png" style={{ filter: "invert(1)" }} ></img>
                </button>
                <button className="up_panel_button" id="pencil" title="Карандаш">
                    <img className="up_panel_button_image" id="pencil_image" alt="pencil.png" src="pencil.png"></img>
                </button>
                <button className="up_panel_button" id="eraser" title="Ластик">
                    <img className="up_panel_button_image" id="eraser_image" alt="eraser.png" src="eraser.png"></img>
                </button>
                <button className="up_panel_button" id="bucket" title="Заливка">
                    <img className="up_panel_button_image" id="bucket_image" alt="bucket.png" src="bucket.png"></img>
                </button>
                <button className="up_panel_button" id="pipette" title="Пипетка">
                    <img className="up_panel_button_image" id="pipette_image" alt="pipette.png" src="pipette.png"></img>
                </button>
                <button className="up_panel_button" id="clear" title="Очистить рабочую область">
                    <img className="up_panel_button_image" id="clearimg" alt="clear.png" src="clear.png"></img>
                </button>
                <button className="up_panel_button" id="upload" title="Загрузить изображение на сайт">
                    <img className="up_panel_button_image" id="uploadimg" alt="upload.png" src="upload.png"></img>
                    <input className="hiddenInput" type="file" accept="image/*,.png,.jpg,.gif,.web,.bmp" id="my_hidden_file" name="loadfile"></input>
                </button>
                <button className="up_panel_button" id="save" title="Сохранить изображение">
                    <img className="up_panel_button_image" id="saveimg" alt="save.png" src="save.png"></img>
                </button>
                <button className="up_panel_button" id="generate" data-toggle="gen_modal" title="ИИ обработка">
                    <img className="up_panel_button_image" id="generateimg" alt="generate.png" src="generate.png"></img>
                </button>
            </div>
        </div>
    );
};

export default ToolBar;