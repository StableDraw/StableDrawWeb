import { makeAutoObservable } from "mobx";

class ToolState {
    tool:{} | null = null
    color:string = ''
    width = 1
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool:{}) {
        this.tool = tool
    }
    setFillColor(color) {
        this.color = color
    }
    setStrokeColor(color) {
        this.color = color
    }
    setLineWidth(width) {
        // console.log(width)
        this.width = width
    }
    
    setBezieCurve(strong) {
        // this.tool.bezieCurve = strong
        // console.log(strong)
    }
    
}
export default new ToolState()