import * as BABYLON from "@babylonjs/core"
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

export class BabylonScene {
	private scene: BABYLON.Scene;
	private engine: BABYLON.Engine;
	private camera: BABYLON.ArcRotateCamera;
	private loadingProgress: number;
	private assetsManager: BABYLON.AssetsManager;

	constructor(canvas: HTMLCanvasElement,
		modelFileName: string,
		sceneFileName: string = '',
		texBase64: string = '',
		setIsLoaded: void,) {
		this.engine = new BABYLON.Engine(canvas,);

		this.scene = this.createScene();

		this.loadingProgress = 0;
		this.assetsManager = new BABYLON.AssetsManager(this.scene);
		this.assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
			// console.log(totalCount);
			this.loadingProgress = 100 - (remainingCount / totalCount) * 100;
			console.log("Загружено: " + this.loadingProgress.toFixed(2) + "%");
		};


		this.assetsManager.onFinish = () => {
			// setIsLoaded(true);
			console.log("Все ресурсы успешно загружены!");

			// Скройте загрузочный экран
			this.engine.hideLoadingUI();
		};

		this.engine.displayLoadingUI();

		this.camera = this.createCamera(canvas);
		this.createOwnScene(sceneFileName, modelFileName, texBase64);

		let divFps = document.getElementById("fpsBabylon");

		this.engine.runRenderLoop(() => {
			this.scene.render();
			if (divFps) {
				divFps.innerHTML = this.engine.getFps().toFixed() + ' fps';
			}
		});
	}

	createScene(): BABYLON.Scene {
		const scene = new BABYLON.Scene(this.engine);

		const envTex = BABYLON.CubeTexture.CreateFromPrefilteredData(
			"/babylon/envMaps/WhiteSky.env", // Важно передавать в формате .env
			scene,
		);

		scene.environmentTexture = envTex;
		scene.createDefaultSkybox(envTex, true, 1000, 0.25);
		scene.environmentIntensity = 0.5;
		scene.getAnimationRatio();
		scene.autoClear = false;
		// scene.freezeActiveMeshes();


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

	// createInstances(
	// 	modelFileName: string,
	// 	textureFileName: string,
	// 	sceneFileName: string,): void{
	// 		const model = BABYLON.SceneLoader.ImportMesh(
	// 			"",
	// 			"/babylon/3dModels/", // Путь до папки с моделями в папке public 
	// 			`тип а  большая с крышкой.obj`, // Имя файла с моделью
	// 			this.scene,
	// 			async function (newMeshes) {	
	// 				console.log(newMeshes[0]);
	// 				let mesh = newMeshes[0]
	// 				mesh.isVisible = false;
	// 				for (let index = 0; index < 3; index++) {
	// 					let newInstance =  await mesh.createInstance("i" + index);
	// 					newInstance.position.x = 0;
	// 					newInstance.position.y = index;
	// 					newInstance.position.z = 0;
	// 				}
	// 			}
	// 			)
	// 		// this.applyMaterial(model, textureFileName);
	// }

	async createOwnModel(
		modelFileName: string,
		sceneFileName: string,
		texBase64: string,
	): Promise<void> {
		if (sceneFileName.includes('Fridge')) {
			for (let i = 0; i < 3; i++) {
				const model = await BABYLON.SceneLoader.ImportMeshAsync(
					"",
					"/babylon/3dModels/", // Путь до папки с моделями в папке public 
					`${modelFileName}.glb`, // Имя файла с моделью
					this.scene,
				)
				await this.applyMaterial(model, texBase64);

				let positionIndex = 0;
				if (sceneFileName === "FridgeSmall")
					positionIndex = i / 2.8;
				else
					positionIndex = i / 2.5;

				model.meshes.forEach((mesh) => {
					mesh.position = new BABYLON.Vector3(0, 0, positionIndex);
					mesh.material?.freeze();
				});
			}
			this.engine.hideLoadingUI();
		}
		else {
			const model = await BABYLON.SceneLoader.ImportMeshAsync(
				"",
				"/babylon/3dModels/", // Путь до папки с моделями в папке public 
				`${modelFileName}.glb`, // Имя файла с моделью
				this.scene,
			);

			await this.applyMaterial(model, texBase64);

			// this.camera.target = model.meshes[1].position;

			model.meshes.forEach((mesh) => mesh.position = new BABYLON.Vector3(0, 0, 0));
			// model.meshes.forEach((mesh) => mesh.rotation = new BABYLON.Vector3(0,0,Math.PI/8));

			this.engine.hideLoadingUI();
		}
	}

	async applyMaterial(
		model: BABYLON.ISceneLoaderAsyncResult,
		texBase64: string,
	) {
		if (texBase64) {
			const pbrMaterial = new BABYLON.PBRMaterial('pbr', this.scene);
			pbrMaterial.roughness = 1;

			// console.log('Babylon tex64: ', texBase64);
			const texture = BABYLON.Texture.CreateFromBase64String(`data:image;base64,${texBase64}`, '', this.scene); //тут остановился :)
			texture.vScale = -1;
			pbrMaterial._albedoTexture = texture;

			model.meshes[1].material = pbrMaterial;
		}
	}

	async createOwnScene(
		SceneFileName: string,
		ModelFileName: string,
		texBase64: string,
		setIsLoaded: void,
	): Promise<void> {
		if (SceneFileName) {

			const modelTask = this.assetsManager.addMeshTask("modelTask", "", "babylon/scenes/", `${SceneFileName}.glb`);
			// setInterval(()=>console.log(this.loadingProgress), 1000);
			modelTask.onSuccess = (task) => {
				console.log("Модель успешно загружена!");
				task.loadedMeshes.forEach((mesh) => {
					mesh.material?.freeze();
				})
			}
			// const scene = await BABYLON.SceneLoader.ImportMeshAsync(
			// 	"",
			// 	"babylon/scenes/", // Путь до папки со сценами в папке public
			// 	`${SceneFileName}.glb`, // Имя файла с моделью
			// 	this.scene,
			// );
			// scene.meshes.forEach((mesh) => {
			// 	mesh.material?.freeze();
			// })
		}
		this.assetsManager.load();
		this.createOwnModel(ModelFileName, SceneFileName, texBase64);
		// this.createInstances(ModelFileName, textureFileName, SceneFileName);
	}
}