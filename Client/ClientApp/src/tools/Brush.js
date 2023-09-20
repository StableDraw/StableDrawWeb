import Tool from "./Tool";
import canvasState from "../store/canvasState";

export default class Brush extends Tool {
        
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

    }
    mouseDownHandler(e) {
        this.ctx = canvasState.getCanvaRef().getContext("2d", { willReadFrequently: true })
        console.log(canvasState.getCanvaRef())
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)      
        }
    }
    
    draw(x, y) {
        this.ctx.strokeStyle = this.ctx.fillStyle
        this.ctx.lineCap = "round"
        this.ctx.imageSmoothingEnabled= false
        // this.ctx.moveTo(x-1, y-1)
        this.ctx.lineTo(x-.1, y-.1)
        this.ctx.stroke()
    }
}
