import axios from "axios";

export default class ApiTestConst {
    static async login(l, p) {
        const response = await axios.post("https://reqres.in/api/login",{
            email: l,
            password: p
        });
        return response.data
    }
}