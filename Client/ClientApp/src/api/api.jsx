import axios from 'axios'


export default class Textures{
	static async LoadTexture(file) {
		const url = "api/image"
		await axios.post(url, file);
		return axios.get(url);
	}

	static async DeleteTexture(linkToTexture) {
		const id = linkToTexture.split("/");

		return await axios.delete("api/image/" + id[5]);
	}

	static async GetTextureStore(){
		return await axios.get("api/image");
	}
	
}
