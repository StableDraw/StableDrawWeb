import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import canvasState from '../../../../store/canvasState';
import toolState from '../../../../store/toolState';
import TrashCan from '../../../../tools/TrashCan';

const ClearPane = ({actived, ...props}) => {
    const deleteAll = () => {
        toolState.setTool(new TrashCan(canvasState.canvas))
        // canvasState.undo()
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button 
                    sx={{background: "#fff"}} 
                    style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}}
                    onClick={deleteAll}
                    variant="contained"  
                    title={'Очистка рабочей области'}>
                        <img src={"clear.png"} 
                            alt={"clear"} 
                            style={{ width: 30, height: 30}}
                        /> 
                </Button>
            </div>
        </Stack>
    )
};

export default ClearPane