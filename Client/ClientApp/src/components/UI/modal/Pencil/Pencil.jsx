import React, {useMemo, useState} from 'react';
import cl from './Pencil.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
let resMemo = [{},{}] 

const Pencil = ({setActive,getRes,}) => {
    
    const [modal, setModal] = useState(false)
    const active = () => {}
    const rootClass = [cl.myModal]
    if(modal) {
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
    
    const tochnolast = useMemo(()=>{
        if (valueSmoothing !==  undefined && valueThickness !== undefined) {
            if (JSON.stringify(resMemo[0]) !== JSON.stringify(valueThickness) || JSON.stringify(resMemo[1]) !== JSON.stringify(valueSmoothing)) {
                resMemo =  [valueThickness,valueSmoothing]
                getRes([valueThickness,valueSmoothing])
            }
        }  
    },[valueSmoothing,valueThickness])
       return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'pencil.png'} visible={modal} setVisible={setModal} title={'Карандаш'}/>
            <div className={rootClass.join(' ')} id="pencil_window" onMouseLeave={()=> console.log('uraaaaaaaaa')} >
                    <MyInput  id='pencil' callback={getThickness} imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                    <MyInput id='pencil' callback={getSmoothing} imgPath={"smoothing.png"} type={'smoothing'} imgClass={cl.smoothingimg}/>   
            </div>
        </div>
    )
};
export default Pencil;