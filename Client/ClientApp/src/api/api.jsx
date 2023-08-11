import axios from 'axios'


export default class Textures{
	static async LoadTexture(file) {
		const url = "api/image"
		await axios.post(url, file);
		return axios.get(url);
	}

	static async DeleteTexture(linkToTexture) {
		if(linkToTexture.includes('/')){
			const id = linkToTexture.split("/");
			return await axios.delete("api/image/" + id[5]);
		}
			
		return await axios.delete("api/image/" + linkToTexture);
		
	}

	static async GetTextureStorage(){
		return await axios.get("api/image");
	}
	
}
