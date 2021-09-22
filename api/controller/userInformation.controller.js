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

  async getUserInfo(userId, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('GET')
      .send('Get user information');
    validate(schema, response.data);
    return response;
  }

  async deleteUserInfo(userId, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('DELETE')
      .send('Delete user information');
    validate(schema, response.data);
    return response;
  }

  async editUserInfo(userId, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('PUT').body(data)
      .send('Edit user information');
    validate(schema, response.data);
    return response;
  }
}

export default UserInfoController;
