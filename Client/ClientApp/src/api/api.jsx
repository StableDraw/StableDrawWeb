import axios from 'axios'


export default class Files{
	static async LoadFile(File) {
		const url = "api/image"
		await axios.post(url, File);
		return axios.get(url);
	}
	static async DeleteFile(id) {
		const idNew = id.split("/");
		
		const lastIndex = idNew.lastIndexOf() + 1;
		const url = "api/image"
		return await axios.delete("api/image/" + idNew[5])
	}
	
}
