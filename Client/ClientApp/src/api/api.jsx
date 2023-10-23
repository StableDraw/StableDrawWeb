import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";
import ApiToken from "./ApiToken";

export default class Textures {
	static async LoadTexture(file) {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.post("api/image/" + file.fileName, file, await ApiToken.GetConfigToken());
	}

	static async DeleteTexture(imageName) {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.delete("api/image/" + imageName, await ApiToken.GetConfigToken());
	}

	static async GetTextureStorage() {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.get("api/image", await ApiToken.GetConfigToken());
		//return await axios.get("api/image/models", await ApiToken.GetConfigToken());
	}
	static async DeleteAllTextures() {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.delete("api/image", await ApiToken.GetConfigToken());
	}

	static async GetAllModels() {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.get("api/models", await ApiToken.GetConfigToken());
	}

	// static async GetAllScenes(scenesArray){
	// 	if (!await AuthorizeService.isAuthenticated())
	// 		return axios.HttpStatusCode.NotFound;
	// 	return await axios.get("api/image/scenes", await ApiToken.GetConfigToken(), {params: scenesArray});
	// }
}

