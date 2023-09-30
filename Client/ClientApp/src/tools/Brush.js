import Tool from "./Tool";
import canvasState from "../store/canvasState";
import ToolState from "../store/toolState";

export default class Brush extends Tool {
    
    i = 0
    bezie = []
        
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.bezie = []
    }
    mouseDownHandler(e) {
        this.ctx = canvasState.getCanvaRef().getContext("2d", { willReadFrequently: true })
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.imageSmoothingEnabled= false
        this.ctx.imageSmoothingQuality = "high"
        this.ctx.lineJoin = "round"
        this.ctx.lineCap = "round"
        this.ctx.moveTo(e.pageX - e.target.offsetLeft - .5, e.pageY - e.target.offsetTop - .5)
        
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }
    
    draw(x, y) {
        this.ctx.strokeStyle = ToolState.color
        this.ctx.lineWidth = ToolState.width
        
        this.ctx.lineTo(x, y)

        this.ctx.stroke()
    }
}
