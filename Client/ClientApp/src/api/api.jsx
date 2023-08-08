import axios from 'axios'


export default class Files{
	static async LoadFile(File) {
		const url = "api/image"
		await axios.post(url, File);
		return axios.get(url);
	}
	static async StaticFile() {
		const url = "api/image"
		return axios.get(url);
	}
	
}
