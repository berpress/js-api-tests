// eslint-disable-next-line import/no-extraneous-dependencies
import { CookieJar } from 'tough-cookie';
import RegisterUserController from './controller/register.controller';
import AuthUserController from './controller/auth.controller';

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
    this.auth = new AuthUserController(mergedParams);
  }

  // eslint-disable-next-line class-methods-use-this
  unauthorized() {
    return new ApiClient();
  }
}
export default ApiClient;
