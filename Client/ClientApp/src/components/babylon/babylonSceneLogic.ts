import * as BABYLON from "@babylonjs/core"
import "@babylonjs/loaders/glTF";
// import { CustomLoading } from "./customLoading";
import { ILoadingScreen } from "@babylonjs/core";
import api from '../../api/api';


// class CustomLoading implements ILoadingScreen {

// 	loadingUIBackgroundColor: string;
// 	loadingUIText: string;

// 	constructor(
// 		private percentLoaded: HTMLElement,
// 		//  private loader: HTMLElement,
// 		// private loadingBar: JSX.Element,
// 	) {

// 	}
// 	displayLoadingUI(): void {
// 		this.percentLoaded.innerText = '0%';
// 	}
// 	hideLoadingUI(): void {
// 		this.percentLoaded.style.display = 'none';
// 	}

// 	updateLoadingStatus(status: string): void {
// 		this.percentLoaded.innerText = `${status}%`;
// 	}

// }
export class BabylonScene {
	private scene: BABYLON.Scene;
	private engine: BABYLON.Engine;
	private camera: BABYLON.ArcRotateCamera;

	constructor(
		canvas: HTMLCanvasElement,
		percentLoaded: HTMLElement,
		// loader: HTMLElement,
		modelUrl: string,
		sceneUrl: string = '',
		texBase64: string = '',
		envUrl: string) {
		this.engine = new BABYLON.Engine(canvas,);

		this.scene = this.createScene(envUrl);

		this.engine.displayLoadingUI();

		this.camera = this.createCamera(canvas);
		this.createOwnScene(sceneUrl, modelUrl, texBase64);

		// let divFps = document.getElementById("fpsBabylon");

		this.engine.runRenderLoop(() => {
			this.scene.render();
			// if (divFps) {
			// 	divFps.innerHTML = this.engine.getFps().toFixed() + ' fps';
			// }
		});
	}

	 async createEnv(scene, envUrl) {
			if (envUrl) {
				const envTex = BABYLON.CubeTexture.CreateFromPrefilteredData(
					envUrl, // Важно передавать в формате .env
					scene,);

				scene.environmentTexture = envTex;
				scene.createDefaultSkybox(envTex, true, 1000, 0.25);
				scene.environmentIntensity = 0.5;
				scene.getAnimationRatio();
				scene.autoClear = false;
			}
	}

		createScene(envUrl) {
		const scene = new BABYLON.Scene(this.engine);
		this.createEnv(scene, envUrl);

		return scene;
	}


	createCamera(canvas: HTMLCanvasElement): BABYLON.ArcRotateCamera {
		const camera = new BABYLON.ArcRotateCamera(
			"camera",
			2 * Math.PI, // Угол по оси Y (горизонтальное вращение)	
			Math.PI / 2, // Угол по оси X (вертикальное вращение)
			5, // Радиус (расстояние от целевой точки)
			BABYLON.Vector3.Zero(), // Целевая точка, вокруг которой будет вращаться камера
			this.scene
		);

		camera.attachControl(canvas, true);
		camera.speed = 0.1;
		camera.wheelPrecision = 200;
		camera.zoomToMouseLocation = true;

		return camera;
	}

	async createOwnModel(
		modelUrl: string,
		sceneUrl: string,
		texBase64: string,
	): Promise<void> {
		if (sceneUrl.includes('Fridge')) {
			for (let i = 0; i < 3; i++) {
				if (modelUrl){
					const model = await BABYLON.SceneLoader.ImportMeshAsync('', modelUrl,'', this.scene);
					let positionIndex = sceneUrl.includes("FridgeSmall") ? i / 2.8 : i / 2.5;

						model.meshes.forEach(mesh => {
							mesh.position = new BABYLON.Vector3(0, 0, positionIndex);
							this.applyMaterial(mesh, texBase64);
							mesh.material?.freeze();
						})
				}
			}
			this.engine.hideLoadingUI();
		}
		else {
			if (modelUrl){
				const model = await BABYLON.SceneLoader.ImportMeshAsync('', modelUrl,'', this.scene);

				model.meshes.forEach(mesh => {
					this.applyMaterial(mesh, texBase64);
					mesh.position = new BABYLON.Vector3(0, 0, 0)
				});
			}
			this.engine.hideLoadingUI();
		}
	}

	async applyMaterial(
		mesh: BABYLON.AbstractMesh,
		texBase64: string,
	) {
		if (texBase64) {
			const pbrMaterial = new BABYLON.PBRMaterial('pbr', this.scene);
			pbrMaterial.roughness = 1;

			const texture = BABYLON.Texture.CreateFromBase64String(`data:image;base64,${texBase64}`, '', this.scene);
			texture.vScale = -1;
			pbrMaterial._albedoTexture = texture;
			if(mesh)
				mesh.material = pbrMaterial;
		}
	}

	async createOwnScene(
		sceneUrl: string,
		modelUrl: string,
		texBase64: string,
	): Promise<void> {
		if (sceneUrl)
			BABYLON.SceneLoader.Append('', sceneUrl, this.scene, (scene) => {
				scene.meshes.forEach((mesh) => {
					mesh.material?.freeze();
				})
			})

		this.createOwnModel(modelUrl, sceneUrl, texBase64);
	}
}