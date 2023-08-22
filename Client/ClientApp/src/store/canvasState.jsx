import {Component} from "react";

class CanvasState {
    canvas = null
    undoList = []
    redoList = []
    labelSelected = 0

    canvaList = []

    getTestCanvaList() {
        return this.canvaList.find(item => item.attributes[1].value === this.labelSelected)
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
    getCanvasList() {
        return this.canvaList
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