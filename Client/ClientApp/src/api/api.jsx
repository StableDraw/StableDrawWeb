import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";
import ApiToken from "./ApiToken";


export default class Textures {
	static async LoadTexture(file) {
		return await axios.HttpStatusCode.NotFound();
	}
	

	static async DeleteTexture(imageName) {
		return await axios.HttpStatusCode.NotFound()
	}

	static async GetTextureStorage() {
		if (await AuthorizeService.isAuthenticated()) {	

		return await axios.get("api/image", await ApiToken.GetConfigToken());
	}

	static async DeleteAllTextures() {		
		if (await AuthorizeService.isAuthenticated()) {
			const message = await axios.delete("api/image", await ApiToken.GetConfigToken());
			console.log('deleteAllTextures: ', message);
			return message;			
		}
		return await axios.HttpStatusCode.NotFound()
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