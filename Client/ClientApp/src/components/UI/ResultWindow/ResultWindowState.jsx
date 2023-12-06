import { makeAutoObservable } from "mobx";

class ResultWindowState {
	isOpen = false
	images = [];
	constructor() {
		makeAutoObservable(this)
	}
	setImages(images) {
		this.images = images
	}
	getImages() {
		return this.images
	}
	setIsOpen(bool) {
		this.isOpen = bool
	}
}
export default new ResultWindowState