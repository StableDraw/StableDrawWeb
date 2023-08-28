import React, {useState} from 'react';
import cl from "../ParametresHeader/ParametresHeader.module.css";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";

const ParametresHeader = ({setModal}) => {
    return (
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
                        background: "#333333"
                    }}
                    onClick={()=>setModal(false)}
                >
                    <Close
                        color="primary"
                        sx={{
                            fontSize: 28,
                            color: "#fff",
                            justifyContent: "center"
                        }}
                    />
                </Button>
            </div>
        </header>
    );
};
export default ParametresHeader;