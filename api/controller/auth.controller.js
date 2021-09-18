import CONFIG from '../../env';
import Requests from '../requests';
import validate from '../validator';
import BaseController from './base.controller';

const client = new Requests();
class AuthUserController extends BaseController {
  async auth(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/auth`).headers(this.params.token).method('POST').body(data)
      .send();
    validate(schema, response.data);
    return response;
  }
}

export default AuthUserController;
