// eslint-disable-next-line import/no-extraneous-dependencies
import { CookieJar } from 'tough-cookie';
import RegisterUserController from './controller/register.controller';

class ApiClient {
  constructor(params = { token: null, cookies: CookieJar }) {
    const defaultParams = {
      cookies: new CookieJar(),
    };
    const mergedParams = {
      ...defaultParams,
      ...params,
    };
    this.register = new RegisterUserController(mergedParams);
  }
}
export default ApiClient;
