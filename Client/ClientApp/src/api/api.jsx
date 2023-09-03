import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";

export default class Textures {
	static async LoadTexture(file) {
		const url = "api/image"
		//const token = await AuthorizeService.getAccessToken();
		// if (token) {
		// 	file.append('token', token)
		// }
		//console.log('token: ', token)
		const token = await AuthorizeService.getAccessToken()
		const config_auth = {
			headers: !token ? {} : { 'Authorization': `Bearer ${token}` }};
		return  await axios.post(url, file, config_auth);
		//return axios.get(url);
	}
	
	static async DeleteTexture(linkToTexture) {
		if (linkToTexture.includes('/')) {
			const id = linkToTexture.split("/");
			// из полученного массива(пример: [., api, id]) берём id(последний el)
			return await axios.delete("api/image/" + id[id.length - 1]);
		}
		// В этом случае передали id, а не ссылку
		const id = linkToTexture;
		return await axios.delete("api/image/" + id);
	}

	static async GetTextureStorage() {
		if(AuthorizeService.isAuthenticated())
		{
			console.log(AuthorizeService.getUser())
			const token = await AuthorizeService.getAccessToken()
			const config_auth = {
				headers: !token ? {} : { 'Authorization': `Bearer ${token}` }};
				//headers: !token ? {} : { 'Authorization': `${token}` }};
			console.log(config_auth)
			return await axios.get("api/image", config_auth);	
		}
		return await axios.HttpStatusCode.NotFound()
	}
}
