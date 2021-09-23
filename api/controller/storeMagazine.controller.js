import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class StoreMagazineController extends BaseController {
  async addStore(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/store/${data.name}`).headers(this.params.token).method('POST')
      .send('Add new store');
    validate(schema, response.data);
    return response;
  }

  async getStore(data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/store/${data.name}`).headers(this.params.token).method('GET')
      .send('Add new store');
    validate(schema, response.data);
    return response;
  }
}

export default StoreMagazineController;
