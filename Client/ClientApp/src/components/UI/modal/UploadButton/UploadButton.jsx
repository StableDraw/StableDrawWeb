import React, {useState} from 'react';
import cl from './UploadButton.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const UploadButton = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'upload.png'} visible={modal} setVisible={setModal} title={'Загрузить изображение на сайт'}/>
            <div className={rootClass.join(' ')} id="upload">
                <input className={cl.hiddenInput} type="file" accept="image/*,.png,.jpg,.gif,.web,.bmp" id="my_hidden_file" name="loadfile"></input>
            </div>
        </div>
    )

};

export default UploadButton