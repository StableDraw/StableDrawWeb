import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
        
    }
    
    draw(x, y) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineCap = "round"
        this.ctx.clearRect(x - 12,y - 12,this.ctx.lineWidth,this.ctx.lineWidth)
        // this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
