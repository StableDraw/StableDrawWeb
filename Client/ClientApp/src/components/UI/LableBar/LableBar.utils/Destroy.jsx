import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Destroy = ({ids,deleteCanva,indexDelete, ...props}) => {
    const Destroy = () => {
        // const list = CanvasState.getCanvasList()
        props.remove(props.item)
        deleteCanva(indexDelete)
        // CanvasState.delCanvasList(indexDelete)
        // console.log(list)
    }
    return (
            <CloseIcon  onClick={Destroy} sx={{ fontSize: 20 }} title="Удалить слой" style={{}}/>
    );
};

export default Destroy;