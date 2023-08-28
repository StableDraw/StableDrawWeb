import Tool from "./Tool";
export default class TrashCan extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }
    listen(e) {
        this.deleteAll()
    }
    deleteAll() {
        this.ctx.clearRect(0, 0, 1080, 732);
     
    }
}