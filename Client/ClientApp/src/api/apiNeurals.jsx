import axios from 'axios'
import ApiToken from "./ApiToken";
import AuthorizeService from '../components/api-authorization/AuthorizeService';

export default class Neurals {
	static async GetNeurals(neuralType){
		if (await AuthorizeService.isAuthenticated()) {
			return await axios.get(`api/neural/colorizer`, await ApiToken.GetConfigToken());
		} else {
			return await axios.HttpStatusCode.NotFound();
		}
	}

	static async RunNeural(neuralImagesConfig) {
		if (await AuthorizeService.isAuthenticated()) {
			return await axios.get("api/neural", await ApiToken.GetConfigToken(), neuralImagesConfig);
		} else {
			return await axios.HttpStatusCode.NotFound();
		}
	}
}