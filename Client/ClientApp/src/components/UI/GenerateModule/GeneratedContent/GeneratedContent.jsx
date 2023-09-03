import React, {Component, useState} from 'react';
import cl from "../GeneratedContent/GeneratedContent.module.css";
import ParametresHeader from '../ParametresHeader/ParametresHeader';
import ParametresPanel from "../ParametresPanel/ParametresPanel";
const GeneratedContent = ({setModal}) => {
    return (
        <div className={cl.contentBox}>
            <ParametresHeader setModal={setModal} />
            <ParametresPanel setModal={setModal} />
        </div>
    );
};
export default GeneratedContent;