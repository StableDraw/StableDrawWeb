import * as BABYLON from "@babylonjs/core"
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

export class BabylonScene {
	private scene: BABYLON.Scene;
	private engine: BABYLON.Engine;
	private camera: BABYLON.ArcRotateCamera;

	constructor(canvas: HTMLCanvasElement,
		modelFileName: string,
		sceneFileName: string = '',
		textureFileName: string = '',) {
		this.engine = new BABYLON.Engine(canvas, true);

		this.engine.displayLoadingUI();
		this.scene = this.createScene();

		this.camera = this.createCamera(canvas);

		this.createOwnScene(sceneFileName, modelFileName, textureFileName);

		this.engine.runRenderLoop(() => {
			this.scene.render();
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

		return scene;
	}



	createCamera(canvas: HTMLCanvasElement): BABYLON.ArcRotateCamera {
		const camera = new BABYLON.ArcRotateCamera(
			"camera",
			2*Math.PI , // Угол по оси Y (горизонтальное вращение)
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
		modelFileName: string,
		textureFileName: string,
		sceneFileName: string,
	): Promise<void> {
		if (sceneFileName === 'Fridge') {
			for(let i = 0; i < 3; i++) {
				const model = await BABYLON.SceneLoader.ImportMeshAsync(
				"",
				"/babylon/3dModels/", // Путь до папки с моделями в папке public 
				`${modelFileName}.glb`, // Имя файла с моделью
				this.scene,
				// async function (newMeshes) {
				// 	console.log(newMeshes);
				// 	let mesh = newMeshes[0]
				// 	for (let index = 0; index < 3; index++) {
				// 		let newInstance =  await mesh.createInstance("i" + index);
				// 		newInstance.position.x = 0;
				// 		newInstance.position.y = index;
				// 		newInstance.position.z = 0;
				// 	}
				// }
			)
			await this.applyMaterial(model, textureFileName);
			model.meshes.forEach((mesh => mesh.position = new BABYLON.Vector3(0, 0, i/2.5)));
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

			await this.applyMaterial(model, textureFileName);

			// this.camera.target = model.meshes[1].position;

			model.meshes.forEach((mesh) => mesh.position = new BABYLON.Vector3(0, 0, 0));
			// model.meshes.forEach((mesh) => mesh.rotation = new BABYLON.Vector3(0,0,Math.PI/8));

			this.engine.hideLoadingUI();
		}
	}

	async applyMaterial(
		model: BABYLON.ISceneLoaderAsyncResult,
		textureFileName: string
	) {
		if (textureFileName) {
			const pbrMaterial = new BABYLON.PBRMaterial('pbr', this.scene);
			pbrMaterial.roughness = 1;

			const texture = new BABYLON.Texture(textureFileName, this.scene);
			texture.vScale = -1;

			pbrMaterial._albedoTexture = texture;

			model.meshes[1].material = pbrMaterial;
		}
	}

	async createOwnScene(
		SceneFileName: string,
		ModelFileName: string,
		textureFileName: string,
	): Promise<void> {
		if (SceneFileName) {
			await BABYLON.SceneLoader.ImportMeshAsync(
				"",
				"babylon/scenes/", // Путь до папки со сценами в папке public
				`${SceneFileName}.glb`, // Имя файла с моделью
				this.scene,
			);
		}
		this.createOwnModel(ModelFileName, textureFileName, SceneFileName);
	}
}