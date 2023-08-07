import axios from 'axios'


export default class Files{
	static async connect(img) {
		try{
			let files = await axios.post('/textures/', {"method": 'PUT', "img": img});
		}catch(e){
			console.log(e);
		}
	}
}
