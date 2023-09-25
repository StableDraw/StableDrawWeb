import { ILoadingScreen } from "@babylonjs/core";

// не используется: в процессе разработки

export class CustomLoading implements ILoadingScreen {

	loadingUIBackgroundColor: string;
	loadingUIText: string;

	constructor(
		private percentLoaded: HTMLElement,
		//  private loader: HTMLElement,
		// private loadingBar: JSX.Element,
	){

	}
	displayLoadingUI(): void {
		this.percentLoaded.innerText = '0';
	}
	hideLoadingUI(): void {

	}



}