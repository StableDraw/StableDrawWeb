import React, {useState, useRef, useEffect} from 'react';
import cl from './LeftPanel.module.css';
import Button from "@mui/material/Button";
const ContentTest = ({props}) => {
    // const allNeurons = useRef([])
    // const [neurons, setNeurons]=useState([])
    // const [input, setInput] = useState('')
    // useEffect(()=>{
    //     async function fetchNeurons() {
    //         const res = await fetch('https://localhost:44404')
    //         allNeurons.current = await res.json()
    //         setNeurons(allNeurons.current)
    //     }
    //     fetchNeurons()
    // }, [])

    // useEffect(()=>{
    //     setNeurons(
    //         allNeurons.current.filter((u)=>
    //             u.name.toLowerCase().includes(input.toLowerCase())
    //         )
    //     )
    // }, [input])
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)
    const [modal5, setModal5] = useState(false)
    const showAdding1Modal = () => {
        setModal(!modal)
    }
    const showAdding2Modal = () => {
        setModal1(!modal1)
    }
    const showAdding3Modal = () => {
        setModal2(!modal2)
    }
    const showAdding4Modal = () => {
        setModal3(!modal3)
    }
    const showAdding5Modal = () => {
        setModal4(!modal4)
    }
    const showAdding6Modal = () => {
        setModal5(!modal5)
    }
    {/* <input value={input} onChange={(e)=>setInput(e.target.value)} />
        <ul>

            neurons.find(c => c.value === тут типа передача текста)
            {neurons.map((neuron)=>(
                <li key={neuron.id}>{neuron.name}</li>
            ))}
        </ul> */}
    // '&:hover': {backgroundColor: '#474747', color: '#555DD3'}
    return (
        <div className={cl.Text}>
            <Button
                className={cl.adding1}
                sx={{
                    backgroundColor: modal ? "#ff0000" : "#000000",
                    '&:hover': {
                        borderColor: modal ? "#ffffff" : "#00f139",
                        border: 2,
                        outlineColor: modal ? "#00f139" : "#ffffff",
                        outline: 2},
                }}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    position: "static",
                }}
                variant="contained"
                onClick={showAdding1Modal}
                title={'ChatGPT'}
            >
                <img
                    src={"ChatGPT.jpg"}
                    alt={"ChatGPT"}
                    style={{width: 100, height: 100, borderRadius: 5}}
                />
            </Button>
            <Button
                className={cl.adding2}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    borderColor: modal1 ? "#ff0000" : "#000000",
                    border: 2,
                    position: "static",
                }}
                variant="contained"
                onClick={showAdding2Modal}
                title={'Midjourney'}
            >
                <img
                    src={"Midjourney.png"}
                    alt={"Midjourney"}
                    style={{width: 150, height: 150, borderRadius: 5}}
                />
            </Button>
            <Button
                className={cl.adding3}
                sx={{background: "#fff"}}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    borderColor: modal1 ? "#ff0000" : "#000000",
                    border: 2,
                    position: "static",
                }}
                variant="contained"
                onClick={showAdding3Modal}
                title={'Kandinsky'}
            >
                <img
                    src={"Kandinsky.webp"}
                    alt={"Kandinsky"}
                    style={{width: 150, height: 150, borderRadius: 5}}
                />
            </Button>
            <Button
                className={cl.adding4}
                sx={{background: "#fff"}}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    borderColor: modal1 ? "#ff0000" : "#000000",
                    border: 2,
                    position: "static",
                }}
                variant="contained"
                onClick={showAdding4Modal}
                title={'YandexGPT'}
            >
                <img
                    src={"YandexGPT.webp"}
                    alt={"YandexGPT"}
                    style={{width: 150, height: 150, borderRadius: 5}}
                />
            </Button>
            <Button
                className={cl.adding5}
                sx={{background: "#fff"}}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    borderColor: modal1 ? "#ff0000" : "#000000",
                    border: 2,
                    position: "static",
                }}
                variant="contained"
                onClick={showAdding5Modal}
                title={'DALL-E'}
            >
                <img
                    src={"dall-e.webp"}
                    alt={"dall-e"}
                    style={{width: 150, height: 150, borderRadius: 5}}
                />
            </Button>
            <Button
                className={cl.adding6}
                sx={{background: "#fff"}}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    minWidth: 150,
                    minHeight: 150,
                    borderColor: modal1 ? "#ff0000" : "#000000",
                    border: 2,
                    // position: "static",
                }}
                variant="contained"
                onClick={showAdding6Modal}
                title={'LoveGPT'}
            >
                <img
                    src={"LoveGPT.jpg"}
                    alt={"LoveGPT"}
                    style={{width: 150, height: 150, borderRadius: 5}}
                />
            </Button>
        </div>
    );
};

export default ContentTest;