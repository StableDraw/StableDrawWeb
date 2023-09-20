import {makeAutoObservable, observable} from "mobx";

class CanvasState {
    canvas = null
    undoList = []
    redoList = []
    labelSelected = 0
    canvaList = []
    
    selectContextLabel = null
    
    mergeList = []
    
    mergeCanvas = []
    
    mergeFinal = null 
    constructor() {
        observable(this)
    }
    
    setMergeList(data) {
        this.mergeList = [...data]
    }
    setMergeCanvas(data) {
        this.mergeCanvas = [...data]
        // console.log("merge", this.mergeCanvas)
    }
    
    mergeAllCanvas() {
        if (this.mergeCanvas.length !== (0 || 1)) {
            let res = this.mergeCanvas.at(-1)
            let ImgMap = []
            
            this.mergeCanvas.map((item) => {
                let img = new Image()
                img.src = item.toDataURL()
                ImgMap = [...ImgMap, item.toDataURL()]
                img.onload = () => {
                    res.getContext("2d", { willReadFrequently: true }).drawImage(img, 0, 0, 1080, 732)
                }
            })
            
            this.mergeFinal = ImgMap[ImgMap.length - 1]
            console.log(this.mergeFinal)
        }
    }
    getMergeCanvas() {
        return this.mergeFinal
    }
    

    setCanvas(canvas) {
        this.canvas = null

        this.canvas = canvas
    }

    getCanvas() {
        return this.canvas
    }


    setCanvasList(canva) {
        this.canvaList = [...this.canvaList, canva]
    }
    delCanvasList(index) {
        this.canvaList = this.canvaList.filter(l => 
            parseInt(l.attributes[1].value) !== parseInt(index)
        )
    }
    getCanvasList() {
        return this.canvaList
    }
    selectedContextLabel(data) {
        this.selectContextLabel = data
    }
    getSelectContextLabel(){
        return this.selectContextLabel
}
    setLabel(label) {

        this.labelSelected = label

        // console.log("Текущая канваЖ ", this.canvas);
    }
    getSelectLabel(){
        return this.labelSelected
    }

    getCanvaRef() {
        return this.canvaList[this.labelSelected]
    }

    getUndo() {
        try {
            if (this.undoList.length > 0) {
                return this.canvas.toDataURL()
            }
        } catch(e) {
            console.log("error", e);
        }


    }
    pushToUndo(data) {
        this.undoList.push(data)
        this.redoList = []
    }
    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d', { willReadFrequently: true })
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d', { willReadFrequently: true })
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload =  () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }

}
export default new CanvasState()