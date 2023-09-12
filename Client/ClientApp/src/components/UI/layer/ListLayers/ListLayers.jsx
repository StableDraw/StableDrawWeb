import ListItem from "../ListItem/ListItem";
import cl from './ListLayers.module.css'
import {useMemo, useState} from "react";
import CanvasState from "../../../../store/canvasState";

const ListLayers = ({layers, remove, canva, Clear, deleteCanva, Visable, defOpacity}) => {
    
    const [merge, setMerge] = useState([])
    const [canvasMerge, setCanvasMerge] = useState([])
    const LabelMerge = (e) => {
        if (e.ctrlKey) {
            setMerge([...merge, CanvasState.getSelectContextLabel()])
        }
        else {
            setMerge([CanvasState.getSelectContextLabel()])
        }
        
    }
    useMemo(() => {
        CanvasState.setMergeList(merge)
    }, [merge])
    
    const CanvasMerge = (e) => {
        if (e.ctrlKey) {
            setCanvasMerge([...canvasMerge, CanvasState.getCanvasList().find(
                    c => c.attributes[1].value === CanvasState.getSelectLabel()
                )]
            )
        }
        else {
            setCanvasMerge([CanvasState.getCanvasList().find(
                    c => c.attributes[1].value === CanvasState.getSelectLabel()
                )]
            )
            
        }
    }
    useMemo(() => {
        CanvasState.setMergeCanvas(canvasMerge)
    }, [canvasMerge])
    
    
    return (
        <div className={cl.layer_box}>
            {layers.map((item) =>
                <ListItem 
                    defOpacity={defOpacity} 
                    merger={LabelMerge} 
                    mergeCanvas={CanvasMerge} 
                    deleteCanva={deleteCanva} 
                    Visable={Visable} 
                    canva={canva} 
                    Clear={Clear} 
                    index={item.index} 
                    remove={remove} 
                    key={item.id} 
                    item={item}/>
            )}
        </div>
    );
};

export default ListLayers;