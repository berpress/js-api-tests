import validate from '../validator';
import Requests from '../requests';
import CONFIG from '../../env';
import BaseController from './base.controller';

const client = new Requests();
class StoreItemController extends BaseController {
  async addItem(name, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/item/${name}`).headers(this.params.token).body(data).method('POST')
      .send('Add new item');
    validate(schema, response.data);
    return response;
  }

  async getItem(name, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/item/${name}`).headers(this.params.token).method('GET')
      .send('Get new store');
    validate(schema, response.data);
    return response;
  }

  async editItem(name, data, schema) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/item/${name}`).headers(this.params.token).body(data).method('PUT')
      .send('Edit item');
    validate(schema, response.data);
    return response;
  }
}

export default StoreItemController;
