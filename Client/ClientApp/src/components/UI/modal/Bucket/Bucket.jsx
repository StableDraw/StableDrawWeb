import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Bucket = () => {
    const [modal, setModal] = useState(false)
    const showBucketModal = () => {
        setModal(!modal)
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showBucketModal} title={'Заливка'}><img src={"bucket.png"} alt={"bucket"} style={{ width: 30, height: 30}}/> </Button>
            </div>
        </Stack>
    )
};

export default Bucket