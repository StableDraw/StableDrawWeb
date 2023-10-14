import Brush from "./Brush";
import FloodFill from 'q-floodfill'
import canvasState from "../store/canvasState";
import ToolState from "../store/toolState";

export default class Bucket extends Brush {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }
    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    }
    mouseDownHandler(e) {
        this.ctx = canvasState.getCanvaRef().getContext("2d", { willReadFrequently: true })
        this.fills(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    fills(x, y) {
        const floodFill = new FloodFill(this.ctx.getImageData(0,0, this.ctx.canvas.offsetWidth, this.ctx.canvas.offsetHeight))
        floodFill.fill(ToolState.color, x, y, 0)
        this.ctx.putImageData(floodFill.imageData, 0, 0)
    }

}