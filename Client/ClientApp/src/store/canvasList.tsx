import { makeAutoObservable, observable } from "mobx";

interface Canvas {
    id: number;
    title: string;
    active: boolean;
    [key: string]: any
  }

class CanvasList  {
    ids = 1
    activeCanvas:any
    activeCanvasValue = this.ids
    canvases:Canvas[] = [
        {id:this.ids, title:'1', active:true},
      
    ]
    constructor() {
        makeAutoObservable(this,{
            canvases:observable,
            activeCanvasValue: observable
        })
    }
    addCanvas(testCanva: Canvas) {
        this.ids++
        this.canvases.push({...testCanva, id:this.ids,title:`${this.ids}`})
    }
    deleteCanvas(id:number) {
        this.canvases = this.canvases.filter((canvas: {id: number})=> canvas.id !== id)
    }
    setActiveCanvas(canvas,id:number) {
        // console.log(JSON.parse(JSON.stringify(this.canvases)))
        this.activeCanvasValue = id
        this.activeCanvas = canvas
        // console.log(this.activeCanvas)
        this.canvases = this.canvases.map(canva => canva.id === id ? {...canva, active: !canva.active} : {...canva, active: false})
    }

}
export default new CanvasList()