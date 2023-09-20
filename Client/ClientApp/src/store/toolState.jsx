import {Component} from "react";
import {makeAutoObservable, observable} from "mobx";

class ToolState{
    tool = null

    constructor() {
        observable(this)
    }
    setTool(tool) {
        this.tool = tool
    }
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
    
    setBezieCurve(strong) {
        this.tool.bezieCurve = strong
        // console.log(strong)
    }
    
    resTool() {
        return this.tool
    }
    
}
export default new ToolState()