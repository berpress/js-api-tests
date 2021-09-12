import axios from "axios";

export class RegisterUserController {
    baseUrl = 'https://stores-tests-api.herokuapp.com'

    async register(data) {
        const response = await axios.post(`${(this.baseUrl)}/register`, data);
        return response;
    }
}