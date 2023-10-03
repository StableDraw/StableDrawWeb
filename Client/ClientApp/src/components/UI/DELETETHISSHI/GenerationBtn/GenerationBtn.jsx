import React, {useState} from 'react';
import cl from "../GenerationBtn/GenerationBtn.module.css";
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import GeneratedContent from "../GeneratedContent/GeneratedContent";
import UploadButton from "../../modal/UploadButton/UploadButton";
import SaveButton from "../../modal/SaveButton/SaveButton";

const GenerationBtn = () => {
    const [modal, setModal] = useState(false)
    const showGenerationModal = () => {
        setModal(!modal)
    }
    console.log(modal)
    return (
        <div className={cl.flex} style={{ padding: "0 0 10px 0", flex: "0 0 50%", justifyContent: "flex-end"}}>
            <div className={cl.flex} style={{gap: "15px"}}>
                <UploadButton/>
                <SaveButton />
            </div>
      
        </div>         
    );
};

export default GenerationBtn;