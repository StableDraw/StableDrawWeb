import React from 'react';
import SideBar from "./UI/menu/SideBar";



const Drawing = () => {
    return (
        <div>
            <h1>
                Test Drawing
            </h1>
            <div className = "subbody">
                <SideBar light={{item: '1', bla: 2}}/>
            </div>
        </div>
    );
};

export default Drawing;