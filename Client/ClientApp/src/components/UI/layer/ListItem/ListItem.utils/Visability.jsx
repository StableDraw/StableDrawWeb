import React, {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import  cl from '.././ListItem.module.css'
const Visability = ({ids,Visable,IndexVisable, ...props}) => {
    const [item, setId] = useState(ids)
    const [img, setImg] = useState(true)
    const handle = () => {
        setImg(!img)
        // console.log("ids: ", ids)
        Visable({
            index: IndexVisable,
            visable: !img
        })
    }
    return (
        <button onClick={handle} className={cl.layer_left_mini_button} id={"layer_"+item+"_visibility_button"} title="Включить/выключить видимость">
            {img && <VisibilityIcon sx={{ fontSize: 18 }}/>}
            {!img && <VisibilityOffIcon sx={{ fontSize: 18 }}/>}
        </button>
    );
};

export default Visability;