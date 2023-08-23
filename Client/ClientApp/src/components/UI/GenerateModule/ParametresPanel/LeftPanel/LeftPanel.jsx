import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import cl from "./LeftPanel.module.css";
import ContentTest from "./ContentTest";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import NeuronItem from './NeuronItem';


const LeftPanel = ({props}) => {
    
    return (
        <div className={cl.leftpanel}>
            <div className={cl.content}>
                <div className={cl.agreeWindow}>
                    <div className={cl.search_container}>
                        <input 
                            type="text" 
                            className={cl.search_box}
                            required minLength="1"
                            maxLength="100"
                            size="100"
                            placeholder="Поиск нейронок.."

                        />

                        <IconButton>
                            <img
                                src={"search1.webp"}
                                alt={"search1"}
                                style={{width: 30, height: 30, borderRadius: 100, backgroundColor: "#474747"}}
                            />
                        </IconButton>
                    </div>
                    <hr className={cl.hrLine}/>
                    {/* <div className={cl.neurons}>
                        {
                        filteredNeurons.map((neuron, index) => {
                            // return(
                            //     <NeuronItem neuron={neuron} key={index} />
                            // )
                        })
                        }
                    </div> */}
                    <ContentTest 
                    />
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;