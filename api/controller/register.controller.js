import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class RegisterUserController extends BaseController {
  async register(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/register`).headers(this.params.token).method('POST').body(data)
      .send('Register new user');
    validate(schema, response.data);
    return response;
  }
}

export default RegisterUserController;
