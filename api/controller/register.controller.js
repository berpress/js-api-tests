import validate from '../validator';
import Requests from '../requests';
import BASE_URL from '../constants';
import BaseController from './base.controller';

const client = new Requests();
class RegisterUserController extends BaseController {
  async register(data, schema) {
    const response = await client.url(`${(BASE_URL)}/register`).headers(this.params.token).method('POST').body(data)
      .send();
    validate(schema, response.data);
    return response;
  }
}

export default RegisterUserController;
