import React, { useState } from 'react';
import cl from './Pencil.module.css'
import MyInput from '../../MyInput/MyInput';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import toolState from "../../../../store/toolState.tsx";
import Brush from "../../../../toolsMobx/Brush";
// import canvasState from "../../../../store/canvasState";
import canvasState from '../../../../store/canvasState.tsx';
import { observer } from 'mobx-react-lite';
const Pencil = observer(({active, activeBtn}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if (active === 'pencil') {
        if (modal) {
            rootClass.push(cl.up_add_window)
        }

    }

    const showPencilModal = () => {
        setModal(!modal)
    }

    const CallPencil = (e) => {
        e.preventDefault()
        showPencilModal()
        toolState.setTool(new Brush(canvasState.canvas))
        activeBtn('pencil')
    }

    return (
        <div className={cl.el}
            title={'Карандаш'}
            onClick={(e) => CallPencil(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                <path d="M43 11.2652C43.0016 10.9823 42.9474 10.7018 42.8404 10.4399C42.7334 10.1779 42.5757 9.93969 42.3765 9.73881L33.2605 0.623489C33.0596 0.424239 32.8213 0.266602 32.5594 0.159616C32.2974 0.0526299 32.0169 -0.00159986 31.734 3.5933e-05C31.451 -0.00159986 31.1705 0.0526299 30.9086 0.159616C30.6466 0.266602 30.4084 0.424239 30.2075 0.623489L24.123 6.70753L0.623535 30.2053C0.42427 30.4062 0.266621 30.6444 0.159627 30.9063C0.0526338 31.1683 -0.00159998 31.4487 3.59357e-05 31.7317V40.847C3.59357e-05 41.4172 0.226553 41.964 0.629755 42.3672C1.03296 42.7703 1.57982 42.9968 2.15003 42.9968H11.266C11.5669 43.0132 11.8678 42.9661 12.1493 42.8587C12.4308 42.7513 12.6865 42.586 12.9 42.3734L36.2705 18.8756L42.3765 12.8991C42.5727 12.6907 42.7326 12.4509 42.8495 12.1896C42.8702 12.0183 42.8702 11.845 42.8495 11.6737C42.8595 11.5736 42.8595 11.4728 42.8495 11.3727L43 11.2652ZM10.3845 38.6971H4.30003V32.6131L25.6495 11.2652L31.734 17.3492L10.3845 38.6971ZM34.7655 14.318L28.681 8.23392L31.734 5.20265L37.797 11.2652L34.7655 14.318Z" fill="#656565" />
            </svg>
            <div className={rootClass.join(' ')} id="pencil_window">
                <MyInput width={toolState.width} id='pencil' imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg} />
            </div>
        </div>
    )

})

export default Pencil;