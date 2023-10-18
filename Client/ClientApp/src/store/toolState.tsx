import { makeAutoObservable } from "mobx";

class ToolState {
    tool:{} | null = null
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool:{}) {
        this.tool = tool
    }
}
export default new ToolState()