import {Component} from "react";
import {makeAutoObservable, observable} from "mobx";

class ToolState{
    tool = null
    color = null
    width = 1
    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool) {
        this.tool = tool
    }
    setFillColor(color) {
        this.tool.fillColor = color
        this.color = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
        this.width = width
    }
    
    setBezieCurve(strong) {
        this.tool.bezieCurve = strong
        // console.log(strong)
    }
    
    
}
export default new ToolState()