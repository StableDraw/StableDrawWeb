import Brush from "./Brush";
import toolState from "../store/toolState.tsx";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
        
    }
    
    draw(x, y) {
        this.ctx.lineCap = "round"
        this.ctx.lineWidth = toolState.width
        this.ctx.clearRect(x - 12,y - 12,this.ctx.lineWidth,this.ctx.lineWidth)
        this.ctx.stroke()
    }
}