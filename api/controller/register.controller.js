import validate from '../validator';
import Requests from '../requests';
import BASE_URL from '../constants';

const client = new Requests();
class RegisterUserController {
  // eslint-disable-next-line class-methods-use-this
  async register(data, schema) {
    const response = await client.url(`${(BASE_URL)}/register`).method('POST').body(data).send();
    validate(schema, response.data);
    return response;
  }
}

export default RegisterUserController;
