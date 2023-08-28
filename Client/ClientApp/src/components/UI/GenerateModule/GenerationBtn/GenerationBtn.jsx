import React, {useState} from 'react';
import cl from "../GenerationBtn/GenerationBtn.module.css";
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import GeneratedContent from "../GeneratedContent/GeneratedContent";

const GenerationBtn = () => {
    const [modal, setModal] = useState(false)
    const showGenerationModal = () => {
        setModal(!modal)
    }
    console.log(modal)
    return (
        <div>
            <div className={cl.btn}>
                <Button
                    sx={{
                        background: "#474747",
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#555DD3'
                        },
                    }}
                    variant="contained"
                    onClick={showGenerationModal}
                >
                    Отправить на генерацию
                        {/*<img*/}
                        {/*    src={'generate.png'}*/}
                        {/*    alt={"generate"}*/}
                        {/*    style={{ fontSize: 20, height: 25 }}*/}
                        {/*/>*/}

                </Button>
            </div>
            <Modal
                open={modal}
                onClose={showGenerationModal}
                className={cl.window}
            >
                <GeneratedContent setModal={setModal} />
            </Modal>
        </div>
    );
};

export default GenerationBtn;