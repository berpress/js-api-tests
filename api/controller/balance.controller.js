import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class BalanceController extends BaseController {
  async addBalance(userId, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/balance/${userId}`).headers(this.params.token).body(data).method('POST')
      .send('Update user balance');
    validate(schema, response.data);
    return response;
  }

  async getBalance(userId, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/balance/${userId}`).headers(this.params.token).method('GET')
      .send('Get user balance');
    validate(schema, response.data);
    return response;
  }
}

export default BalanceController;
