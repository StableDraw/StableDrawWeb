import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
const Destroy = ({ids,deleteCanva,indexDelete, ...props}) => {
    const Destroy = () => {
        props.remove(props.item)
        deleteCanva(indexDelete)
        console.log(indexDelete)
    }
    return (
            <CloseIcon
                onClick={Destroy}
                sx={{ fontSize: 20 }}
                title="Удалить слой"
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    zIndex: 1000
                }}
            />
    );
};

export default Destroy;