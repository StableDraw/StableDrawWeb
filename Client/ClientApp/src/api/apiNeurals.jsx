import axios from 'axios'
import ApiToken from "./ApiToken";
import AuthorizeService from '../components/api-authorization/AuthorizeService';

export default class Neurals {
	static async GetNeurals(neuralType){
		if (await AuthorizeService.isAuthenticated()) {
			return await axios.get(`api/neural/${neuralType}`, await ApiToken.GetConfigToken())
		} else {
			return await axios.HttpStatusCode.NotFound();
		}
	}
	static async GetNeuralsList() {
		if (await AuthorizeService.isAuthenticated()) {
			return await axios.get('api/neural/neuralList', await ApiToken.GetConfigToken())
		} else {
			return await axios.HttpStatusCode.NotFound()
		}
	}
	
	static async RunNeural(neuralConfig) {
		if (await AuthorizeService.isAuthenticated()) {
			return await axios.get("api/neural", await ApiToken.GetConfigToken(), neuralConfig)
		} else {
			return await axios.HttpStatusCode.NotFound();
		}
	}
}