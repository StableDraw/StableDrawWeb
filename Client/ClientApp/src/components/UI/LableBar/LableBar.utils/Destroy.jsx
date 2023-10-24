import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import canvasList from '../../../../store/canvasList.tsx';
const Destroy = ({item}) => {
    const Destroy = () => {
      canvasList.deleteCanvas(item.id)
    }
    return (
            <CloseIcon onClick={Destroy} sx={{ fontSize: 20 }} title="Удалить слой" style={{}}/>
    );
};

export default Destroy;