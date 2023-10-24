import AuthorizeService from "../components/api-authorization/AuthorizeService";


export default class User {
    static async token() {
        const response = AuthorizeService.getAccessToken();
        return response;
    }

    static async GetConfigToken() {
        const token = await AuthorizeService.getAccessToken()
        return { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } };
    }

    static async getUserName() {
        if (!await AuthorizeService.isAuthenticated())
            return null;

        const user = await AuthorizeService.getUser();
        return user.name;
    }
}