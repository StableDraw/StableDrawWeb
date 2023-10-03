import AuthorizeService from "../components/api-authorization/AuthorizeService";


export default class ApiToken {
    static async token() {
        const response = AuthorizeService.getAccessToken();
        return response;
    }
    
    static async GetConfigToken(){
        const token = await AuthorizeService.getAccessToken()
        return { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } };
    }
}