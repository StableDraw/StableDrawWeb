import {Component} from "react";

class ToolState{
    tool = null

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
        console.log(strong)
    }
    
}
export default new ToolState()