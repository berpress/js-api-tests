import validate from '../validator';
import Requests from '../requests';
import BASE_URL from '../constants';
import BaseController from './base.controller';

const client = new Requests();
class AuthUserController extends BaseController {
  async auth(data, schema) {
    const response = await client.url(`${(BASE_URL)}/auth`).headers(this.params.token).method('POST').body(data)
      .send();
    validate(schema, response.data);
    return response;
  }
}

export default AuthUserController;
