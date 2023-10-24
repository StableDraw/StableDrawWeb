import { makeAutoObservable, observable } from "mobx";

interface Canvas {
    id: number;
    active: boolean;
  }

class CanvasList  {
    ids = 1
    activeCanvas:any
    activeCanvasValue = this.ids
    canvases:Canvas[] = [
        {id:this.ids, active:true},
      
    ]
    constructor() {
        makeAutoObservable(this,{
            canvases:observable,
            activeCanvasValue: observable
        })
    }
    addCanvas(testCanva: Canvas) {
        this.ids++
        this.canvases.push({...testCanva, id:this.ids})
    }
    deleteCanvas(id:number) {
        this.canvases = this.canvases.filter((canvas: {id: number})=> canvas.id !== id)
    }
  
    setActiveCanvas(canvas,id:number) {
        this.activeCanvasValue = id
        this.activeCanvas = canvas
        this.canvases = this.canvases.map(canva => canva.id === id ? {...canva, active: !canva.active} : {...canva, active: false})
    }

}
export default new CanvasList()