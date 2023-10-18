import Tool from "./Tool";


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
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft - .5, e.pageY - e.target.offsetTop - .5)
        // this.ctx.imageSmoothingEnabled= false
        // this.ctx.imageSmoothingQuality = "high"
        // this.ctx.lineJoin = "round"
        // this.ctx.lineCap = "round"
        
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }
    
    draw(x, y) {
        // this.ctx.strokeStyle = ToolState.color
        // this.ctx.lineWidth = ToolState.width
        
        this.ctx.lineTo(x, y)

        this.ctx.stroke()
    }
}
