import React from 'react';
import cl from "../GeneratedContent/GeneratedContent.module.css";
import LeftPanel from "../ParametresPanel/LeftPanel/LeftPanel";
import ParamsWindow from "../ParametresPanel/RightPanel/ParamsWindow/ParamsWindow";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
const GeneratedContent = ({setModal}) => {
    return (
        <div className={cl.contentBox}>
            <header>
                <div className={cl.header}>
                    <Button
                        className={cl.closebtn}
                        sx={{
                            maxWidth: 35,
                            maxHeight: 35,
                            minWidth: 35,
                            minHeight: 35,
                            color: '#ffffff',
                            background: "#333333",
                        }}
                        onClick={()=>setModal(false)}
                    >
                        <Close
                            color="primary"
                            sx={{
                                fontSize: 28,
                                color: "#fff",
                                justifyContent: "center",
                            }}
                        />
                    </Button>
                </div>
            </header>
            <div className={cl.contented}>
                <LeftPanel/>
                <ParamsWindow setModal={setModal}/>
            </div>
        </div>
    );
};
export default GeneratedContent;