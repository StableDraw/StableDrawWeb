import Tool from "./Tool";
export default class ClearCanvas extends Tool {
    constructor(canvas:CanvasRenderingContext2D) {
        super(canvas)
        this.listen()
    }
    listen(e?) {
        this.deleteAll()
    }
    deleteAll() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.offsetWidth, this.ctx.canvas.offsetHeight);
        console.log(this.ctx)
     
    }
}