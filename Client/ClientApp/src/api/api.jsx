import axios from 'axios'
import AuthorizeService from "../components/api-authorization/AuthorizeService";

export default class Textures {
	static async LoadTexture(file) {
		const url = "api/image"
		const token = await AuthorizeService.getAccessToken();
		// if (token) {
		// 	file.append('token', token)
		// }
		console.log('token: ', token)
		return  await axios.post(url, file);
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
		return await axios.get("api/image");
	}
}
