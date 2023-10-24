import React from 'react';
import cl from './ClearPane.module.css';

import canvasState from '../../../../store/canvasState.tsx';
import toolState from '../../../../store/toolState.tsx';
import TrashCan from '../../../../toolsMobx/ClearCanvas.ts';

const ClearPane = ({actived, ...props}) => {
    
    const deleteAll = () => {
        toolState.setTool(new TrashCan(canvasState.canvas))
        // canvasState.undo()
    }
   
   
    return (
                <div className={cl.el} 
                   onClick={deleteAll}
                   title={'Очистка рабочей области'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="43" viewBox="0 0 40 43" fill="none">
                        <g clipPath="url(#clip0_42_459)">
                            <path d="M1 9.2H39M34.7778 9.2V37.9C34.7778 38.9874 34.3329 40.0302 33.5411 40.7991C32.7493 41.568 31.6754 42 30.5556 42H9.44444C8.32464 42 7.2507 41.568 6.45888 40.7991C5.66706 40.0302 5.22222 38.9874 5.22222 37.9V9.2M11.5556 9.2V5.1C11.5556 4.01261 12.0004 2.96976 12.7922 2.20086C13.584 1.43196 14.658 1 15.7778 1H24.2222C25.342 1 26.416 1.43196 27.2078 2.20086C27.9996 2.96976 28.4444 4.01261 28.4444 5.1V9.2M15.7778 19.45V31.75M24.2222 19.45V31.75" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_42_459">
                                <rect width="40" height="43" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
    )
};

export default ClearPane