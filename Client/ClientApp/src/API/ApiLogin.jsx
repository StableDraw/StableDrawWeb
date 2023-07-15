import axios from "axios";
import authService from "../components/api-authorization/AuthorizeService";


export default class ApiLogin {

    static async Login(l, p) {
        // const respons = await axios.post("", request)
        return [l, p]
    }
    static async Logout() {
        return await authService.signOut()
    }

}