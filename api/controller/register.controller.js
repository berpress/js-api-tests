import validate from "../validator";
import Requests from "../requests";

const client = new Requests();
export class RegisterUserController {
    baseUrl = 'https://stores-tests-api.herokuapp.com'

    async register(data, schema) {
        const response = await client.url(`${(this.baseUrl)}/register`).method('POST').body(data).send();
        validate(schema, response.data)
        return response;
    }
}