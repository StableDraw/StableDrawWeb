import Tool from "./Tool";
import canvasState from "../store/canvasState";
import ToolState from "../store/toolState";

export default class Bezie extends Tool {

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
        this.ctx.imageSmoothingEnabled= true
        this.ctx.imageSmoothingQuality = "high"
        this.ctx.lineJoin = "round"
        this.ctx.lineCap = "round"
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)

    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw(x, y) {
        this.ctx.beginPath()
        if (x) {
            this.i++
        }
        if (this.i === 1) {
            this.bezie = [...this.bezie, {x: x, y: y}]
            if(this.bezie.length >= 6) this.bezie.shift();
            this.i = 0
        }
        this.ctx.strokeStyle = ToolState.color
        this.ctx.lineWidth = 1

        for( let i = 0; i < this.bezie.length - 4; i++ ) {
            this.ctx.bezierCurveTo(this.bezie[i + 1].x, this.bezie[i + 1].y, this.bezie[i + 2].x, this.bezie[i + 2].y, this.bezie[i + 3].x, this.bezie[i + 3].y)
            this.ctx.arc(this.bezie[i].x, this.bezie[i].y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0)
            this.ctx.fill();
            this.ctx.closePath()
            this.ctx.arc(this.bezie[i + 1].x, this.bezie[i + 1].y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0)
            this.ctx.fill();
        }
        // this.ctx.bezierCurveTo(this.bezie[this.i].x, this.bezie[this.i].y, this.bezie[this.i + 1 ].x, this.bezie[this.i + 1].y, this.bezie[this.i + 2 ].x, this.bezie[this.i + 2].y)
        this.ctx.stroke()
        // this.ctx.closePath()
        // this.ctx.arc(this.bezie[this.bezie.length - 1].x, this.bezie[this.bezie.length - 1].y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0)
    }
}
