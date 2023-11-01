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
    setIsOpen(){
        this.isOpen = !this.isOpen
    }
}
export default new ResultWindowState