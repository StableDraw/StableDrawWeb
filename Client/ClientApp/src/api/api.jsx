import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";
import ApiToken from "./ApiToken";


export default class Textures {
	static async LoadTexture(file) {
		if(await AuthorizeService.isAuthenticated()) {
			const data = await axios.post("api/image/" + file.fileName, file, await ApiToken.GetConfigToken());
			console.log('Post', data);
			return data;
		}
	}
	

	static async DeleteTexture(imageName) {
		if(await AuthorizeService.isAuthenticated())
		{			
			console.log('texture to delete: ', imageName);
			const message = await axios.delete("api/image/" + imageName, await ApiToken.GetConfigToken());
			console.log('Delete one tex: ', message);
			return message;
		}
		return await axios.HttpStatusCode.NotFound()
	}

	static async GetTextureStorage() {
		if (!await AuthorizeService.isAuthenticated()) {
			return await axios.HttpStatusCode.NotFound()
		} else {
			const data = await axios.get("api/image", await ApiToken.GetConfigToken());
			console.log(data);
			return data;
		}
	}

	static async DeleteAllTextures() {
		if (!await AuthorizeService.isAuthenticated()) {
			return await axios.HttpStatusCode.NotFound()
		}
			const message = await axios.delete("api/image", await ApiToken.GetConfigToken());
			console.log('deleteAllTextures: ', message);
			return message;
	}
}

// export default class Neurals {
// 	static async GetNeurals(neuralType){
// 		if (await AuthorizeService.isAuthenticated()) {
// 			return await axios.get("api/neural/" + neuralType, await ApiToken.GetConfigToken());
// 		} else {
// 			return await axios.HttpStatusCode.NotFound();
// 		}
// 	}
//
// 	static async RunNeural(neuralImagesConfig) {
// 		if (await AuthorizeService.isAuthenticated()) {
// 			return await axios.get("api/neural", await ApiToken.GetConfigToken(), neuralImagesConfig);
// 		} else {
// 			return await axios.HttpStatusCode.NotFound();
// 		}
// 	}
// }