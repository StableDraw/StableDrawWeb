import React, {useMemo, useState} from 'react';
import canvasList from '../../../store/canvasList.tsx';
const Add = () => {

    return (
        <button onClick={()=>canvasList.addCanvas({id:4, title: '4', active: false})} className="layers_mini_button" id="add_layers" title="Добавить слой">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.5 12.1741V22.7982" stroke="#656565"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.8172 17.4856H12.1829" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.3571 5H11.6429C7.55952 5 5 8.00571 5 12.2607V23.7393C5 27.9943 7.54762 31 11.6429 31H23.3571C27.4524 31 30 27.9943 30 23.7393V12.2607C30 8.00571 27.4524 5 23.3571 5Z" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
};

export default Add;