import axios from "axios";

export default class ApiTestConst {
    static async login(l, p) {
        const response = await axios.post("api/lohttps://reqres.in/gin",{
            email: l,
            password: p
        });
        return response.data
    }
}