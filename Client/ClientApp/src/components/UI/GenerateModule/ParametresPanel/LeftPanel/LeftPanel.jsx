import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import cl from "./LeftPanel.module.css";
import ContentTest from "./ContentTest";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import NeuronItem from './NeuronItem';


const LeftPanel = ({props}) => {
    
    // const [neurons, setNeurons] = useState([])
    // const [value, setValue] = useState('')
    // const getNeurons = () => {
    //     axios.get("https://localhost:44404")
    //         .then((response)=>{
    //             setNeurons(response.data)
    //         })
    // }
    // useEffect(()=>{
    //     getNeurons()
    // }, [])

    // const filteredNeurons = neurons.filter(neuron => {
    //     return neuron.name.toLowerCase().includes(value.toLowerCase())
    // })
    
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
                            // onChange={(event)=>setValue(event.target.value)}
                            // onkeyup={myFunction}
                        />
                        
                        {/* <ul className={cl.myMenu}>
                            <li><a href="#">HTML</a></li>
                            <li><a href="#">CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">PHP</a></li>
                            <li><a href="#">Python</a></li>
                            <li><a href="#">jQuery</a></li>
                            <li><a href="#">SQL</a></li>
                            <li><a href="#">Bootstrap</a></li>
                            <li><a href="#">Node.js</a></li>
                        </ul> */}
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