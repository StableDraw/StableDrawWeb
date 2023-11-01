import { makeAutoObservable } from "mobx";

class ResultWindowState {
    isOpen:boolean = false
    img:ImageData
    constructor() {
        makeAutoObservable(this)
    }
    setImage(image:ImageData){
        this.img = image
    }
    getImage(){
        return this.img
    }
    setIsOpen(bool:boolean){
        this.isOpen = bool
    }
}
export default new ResultWindowState