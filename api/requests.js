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
    this.options = { ...this.options, data };
    return this;
  }

  params(params) {
    this.options = { ...this.options, params };
    return this;
  }

  headers(token) {
    const headers = { token };
    this.options = { ...this.options, headers };
    return this;
  }

  async send(nameRequest) {
    logger.info(nameRequest);
    logger.info(`Request: method is ${this.options.method}, url is ${this.options.url}, body is ${JSON.stringify(this.options.data, null, 4)}`);
    const response = await axios({
      ...this.options,
    }).catch((error) => {
      logger.info(`Status code is ${error.response.status}`);
      return error.response;
    });
    logger.info(`Response: status is ${response.status},  body is ${JSON.stringify(this.options.data, null, 4)}`);
    return response;
  }
}

export default Requests;
