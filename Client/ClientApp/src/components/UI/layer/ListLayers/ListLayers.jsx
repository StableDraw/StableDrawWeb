import ListItem from "../ListItem/ListItem";
import cl from './ListLayers.module.css'
import canvasList from "../../../../store/canvasList.tsx";
import {observer} from 'mobx-react-lite';
import canvasState from "../../../../store/canvasState.tsx";
const ListLayers = observer(({}) => {
    const layers = canvasList.canvases
    const heightLayerBox = canvasState.heightLayerBox
    // console.log((JSON.parse(JSON.stringify(layers))))
    // const [merge, setMerge] = useState([])
    // const [canvasMerge, setCanvasMerge] = useState([])
    // const LabelMerge = (e) => {
    //     if (e.ctrlKey) {
    //         setMerge([...merge, CanvasState.getSelectContextLabel()])
    //     }
    //     else {
    //         setMerge([CanvasState.getSelectContextLabel()])
    //     }
        
    // }

    // useMemo(() => {
    //     CanvasState.setMergeList(merge)
    // }, [merge])
    
    // const CanvasMerge = (e) => {
    //     if (e.ctrlKey) {
    //         setCanvasMerge([...canvasMerge, CanvasState.getCanvasList().find(
    //                 c => c.attributes[1].value === CanvasState.getSelectLabel()
    //             )]
    //         )
    //     }
    //     else {
    //         setCanvasMerge([CanvasState.getCanvasList().find(
    //                 c => c.attributes[1].value === CanvasState.getSelectLabel()
    //             )]
    //         )
            
    //     }
    // }
    // useMemo(() => {
    //     CanvasState.setMergeCanvas(canvasMerge)
    // }, [canvasMerge])
    
    
    return (
        <div className={cl.layer_box} style={{ maxHeight: `${heightLayerBox}px`}}>
            {layers.map((item) =>
               <ListItem item={item} key={item.id}/>
            )}
        </div>
    );
})

export default ListLayers;