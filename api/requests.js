// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true, colorize: true });

class Requests {
  constructor() {
    this.options = {};
  }

  url(url) {
    this.options = { ...this.options, url };
    return this;
  }

  method(method) {
    this.options = { ...this.options, method };
    return this;
  }

  body(data) {
    const { ...object } = data;
    this.options = { ...this.options, data: object };
    return this;
  }

  params(params) {
    this.options = { ...this.options, params };
    return this;
  }

  headers(token) {
    const headers = (token === null) ? null : { Authorization: `JWT ${token}` };
    // const headers = { Authorization: `JWT ${token}` };
    this.options = { ...this.options, headers };
    return this;
  }

  async send(nameRequest) {
    logger.info(`${nameRequest} request: method is ${this.options.method}, url is ${this.options.url}, body is ${JSON.stringify(this.options.data, null, 4)}`);
    try {
      const response = await axios({
        ...this.options,
      });
      logger.info(`${nameRequest} response: status is ${response.status}, body is ${JSON.stringify(response.data, null, 4)}`);
      return response;
    } catch (e) {
      logger.info(`${nameRequest} response: status is ${e.response.status},  body is ${JSON.stringify(e.response.data, null, 4)}`);
      return e.response;
    }
  }
}

export default Requests;
