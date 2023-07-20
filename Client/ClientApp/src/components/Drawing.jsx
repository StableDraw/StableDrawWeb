import React from 'react';
import SideBar from "./UI/menu/SideBar";
import LableBar from "./UI/menu/LableBar";



const Drawing = () => {
    return (
        <div>
            <h1>
                Test Drawing
            </h1>
            <div className = "subbody">
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar />
            </div>
        </div>
    );
};

export default Drawing;