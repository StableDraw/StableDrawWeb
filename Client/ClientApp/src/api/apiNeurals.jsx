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
	
	static async RunNeural(requestModel) {
		if (await AuthorizeService.isAuthenticated()) {
			let response = await axios.post(`api/neural`, requestModel, await ApiToken.GetConfigToken())
			console.log(response)
			return response
		} else {
			return await axios.HttpStatusCode.NotFound();
		}
	}
}