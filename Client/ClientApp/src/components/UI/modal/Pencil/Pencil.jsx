import React, {useState,useMemo} from 'react';
import cl from './Pencil.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
let resMemo=[{},{}]
const Pencil = ({actived, setActive,getRes, ...props}) => {

        //         rootClass.push(cl.up_add_window)
    // if(active==='pencil'){
    //     if(/*props.*/ modal) {
    //         rootClass.push(cl.up_add_window)
    //     }
    // }
    const [modal, setModal] = useState(false)
    const [thicknessValue, setThicknessValue] = useState(1)
    const rootClass = [cl.myModal]
    if(/*props.*/ modal) {
        rootClass.push(cl.up_add_window)
    }
    const [valueThickness, setValueThickness] = useState({id: 'pencil', type: 'thickness', res: 1})
    const [valueSmoothing, setValueSmoothing] = useState({id: 'pencil', type: 'smoothing', res: 1})
    const getThickness = (value) => {
        setValueThickness(value)
    }
    const getSmoothing = (value) => {
        setValueSmoothing(value)
    }
    function showPencilModal(){
        setModal(!modal)
    }

    const tochnolast = useMemo(()=>{
        if (valueSmoothing !==  undefined && valueThickness !== undefined) {
            if (JSON.stringify(resMemo[0]) !== JSON.stringify(valueThickness) || JSON.stringify(resMemo[1]) !== JSON.stringify(valueSmoothing)) {
                resMemo =  [valueThickness,valueSmoothing]
                getRes([valueThickness,valueSmoothing])
            }
        }
    },[valueSmoothing,valueThickness])
    // if (actived) {
    //     rootClass.push(cl.active)
    // }
    // else {
    //     rootClass.push(cl.unactive)
    // }
    return (
        <div style={{width:50, display:'inline'}} /*onClick={()=>activeBtn('pencil')}*/>
            {/*<ToolButton src={'pencil.png'} visible={props.modal} setVisible={props.setModal} title={'Карандаш'} isVisibleClass={cl.active} isInvisibleClass={cl.unactive}/>*/}
            <Stack spacing={1} direction="row">
                <div>
                    <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal} setVisible={setModal} variant="contained" onClick={showPencilModal} title={'Карандаш'}><img src={"pencil.png"} alt={"pencil"} style={{ width: 30, height: 30}}/> </Button>
                    {/*<Modal open={modal} onClose={showColorMenuModal} className={cl.window}>*/}
                    {/*    <Content1/>*/}
                    {/*</Modal>*/}
                </div>
            </Stack>
            <div className={rootClass.join(' ')} id="pencil_window" onMouseLeave={()=> console.log('uraaaaaaaaa')}>
                <MyInput  id='pencil' callback={getThickness} imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                <MyInput id='pencil' callback={getSmoothing} imgPath={"smoothing.png"} type={'smoothing'} imgClass={cl.smoothingimg}/>
            </div>
        </div>
    )

};

export default Pencil;