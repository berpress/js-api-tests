// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

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

  async send() {
    return axios({
      ...this.options,
    }).catch((error) =>
    // handle error
    // eslint-disable-next-line implicit-arrow-linebreak
      error.response);
  }
}

export default Requests;
