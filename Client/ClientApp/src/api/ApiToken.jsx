import axios from "axios";
import AuthorizeService from "../components/api-authorization/AuthorizeService";
export default class ApiToken {
    static async token() {
        const response = AuthorizeService.getAccessToken();
        return response;

    }
}