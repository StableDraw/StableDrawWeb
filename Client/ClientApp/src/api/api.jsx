import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";
import ApiToken from "./ApiToken";


export default class Textures {
	static async LoadTexture(file) {
		if(await AuthorizeService.isAuthenticated())
		{
			const data = await axios.post("api/image/" + file.fileName, file, await ApiToken.GetConfigToken());
			console.log('Post', data);
			return data;
		}			
		else
			return await axios.HttpStatusCode.NotFound();
	}
	
	static async DeleteTexture(linkToTexture) {
		if(await AuthorizeService.isAuthenticated())
		{
			if (linkToTexture.includes('/')) {
				const id = linkToTexture.split("/");
				// из полученного массива(пример: [., api, id]) берём id(последний el)
				return await axios.delete("api/image/" + id[id.length - 1], await ApiToken.GetConfigToken());
			}
			// В этом случае передали id, а не ссылку
			const id = linkToTexture;
			return await axios.delete("api/image/" + id, await ApiToken.GetConfigToken());	
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
}

// export default class Neurals {
// 	static async GetNeurals(){
// 		if (!await AuthorizeService.isAuthenticated()) {
// 			return await axios.HttpStatusCode.NotFound();
// 		} else {
// 			return await axios.get("api/neural", await ApiToken.GetConfigToken());
// 		}
// 	}
//
// 	static async RunImagesNeural(neuralImagesConfig) {
// 		if (!await AuthorizeService.isAuthenticated()) {
// 			return await axios.HttpStatusCode.NotFound();
// 		} else {
// 			return await axios.post("api/neural/img", await ApiToken.GetConfigToken(), neuralImagesConfig);
// 		}
// 	}
//
// 	static async RunInfoNeural(neuralInfoConfig){
// 		if (!await AuthorizeService.isAuthenticated()) {
// 			return await axios.HttpStatusCode.NotFound();
// 		} else {
// 			return await axios.post("api/neural/info", await ApiToken.GetConfigToken(), neuralInfoConfig);
// 		}
// 	}
// }