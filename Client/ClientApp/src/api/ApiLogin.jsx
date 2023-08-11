import axios from "axios";
import authService from "../components/api-authorization/AuthorizeService";


export default class ApiLogin {
    static async Logout() {
        return await authService.signOut()
    }

}