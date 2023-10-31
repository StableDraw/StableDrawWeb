import { makeAutoObservable } from "mobx";
class Canvas {
    height = (window.innerHeight / 2) + (window.innerHeight * 0.1) /*половина высоты экрана + 10% экрана*/
    width = (window.innerWidth / 2 ) + (window.innerWidth * 0.05) /*половина ширины экрана + 5% экрана*/
    undoList:any= []
    redoList:any = []
    canvas:any
    imageSrc:ImageData
    
    constructor() {
        makeAutoObservable(this)
    }
    setCanvas(canvas) {
        this.canvas = canvas
    }
    setHeight(value: number) {
        this.height = value
    }
    setWidth(value: number) {
        this.width = value
    }
    pushToUndo(data) {
        this.undoList.push(data)
        this.redoList = []
    }
    pushToRedo(data) {
        this.redoList.push(data)
    }
    setImgSrc(img:ImageData) {
        this.imageSrc = img
    }
    getImgSrc(){
        return this.imageSrc
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

export default new Canvas()