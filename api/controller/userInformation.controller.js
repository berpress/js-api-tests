import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class UserInfoController extends BaseController {
  async addUserInfo(userId, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('POST').body(data)
      .send('Add user information');
    validate(schema, response.data);
    return response;
  }

  async getUserInfo(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/register`).headers(this.params.token).method('POST').body(data)
      .send('Register new user');
    validate(schema, response.data);
    return response;
  }

  async deleteUserInfo(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/register`).headers(this.params.token).method('POST').body(data)
      .send('Register new user');
    validate(schema, response.data);
    return response;
  }

  async editUserInfo(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/register`).headers(this.params.token).method('POST').body(data)
      .send('Register new user');
    validate(schema, response.data);
    return response;
  }
}

export default UserInfoController;
