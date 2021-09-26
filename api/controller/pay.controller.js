import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class PayController extends BaseController {
  async pay(userId, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/pay/${userId}`).headers(this.params.token).body(data).method('POST')
      .send('Buying a product');
    validate(schema, response.data);
    return response;
  }
}

export default PayController;
