import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Destroy = ({ids, ...props}) => {
    const [id, setid] = useState(props.ids)
    const [item, setId] = useState(ids)
    return (
        //<button onClick={() => props.remove(props.item)} hidden = {props.hidden} id={"destroy_layers_"+item} title="Нахуй слой">
            <CloseIcon  onClick={() => props.remove(props.item)} sx={{ fontSize: 20 }}/>
        //</button>
    );
};
export default Destroy;