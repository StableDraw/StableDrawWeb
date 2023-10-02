import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";
import ApiToken from "./ApiToken";

export default class Textures {
	
	static async LoadTexture(file) {
		if(!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.post("api/image/" + file.fileName, file, await ApiToken.GetConfigToken());
	}

	static async DeleteTexture(imageName) {
		if(!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.delete("api/image/" + imageName, await ApiToken.GetConfigToken());
	}

	static async GetTextureStorage() {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;
		
		let token = await AuthorizeService.getAccessToken()
		return await axios.get("api/image", { timeout: 10000, headers: !token ? {} : { 'Authorization': `Bearer ${token}` }}).catch((error) =>
		{
			console.log(error);
		});
	}

	static async DeleteAllTextures() {
		if (!await AuthorizeService.isAuthenticated())
			return axios.HttpStatusCode.NotFound;

		return await axios.delete("api/image", await ApiToken.GetConfigToken());
	}
}

