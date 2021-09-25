// eslint-disable-next-line import/no-extraneous-dependencies
import { CookieJar } from 'tough-cookie';
import RegisterUserController from './controller/register.controller';
import AuthUserController from './controller/auth.controller';
import UserInfoController from './controller/userInformation.controller';
import Auth from '../models/authModel';
import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import { AUTH_USER_SCHEMA } from '../schemas/auth';
import StoreMagazineController from './controller/storeMagazine.controller';
import StoreItemController from './controller/storeItem.controller';

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
    this.userInfo = new UserInfoController(mergedParams);
    this.storeMagazine = new StoreMagazineController(mergedParams);
    this.storeItems = new StoreItemController(mergedParams);
  }

  // eslint-disable-next-line class-methods-use-this
  unauthorized() {
    return new ApiClient();
  }

  async authorized() {
    const client = this.unauthorized();
    const data = new Auth().random();
    const responseRegister = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    const responseAuth = await client.auth.auth(data, AUTH_USER_SCHEMA);
    const token = responseAuth.data.access_token;
    return { userId: responseRegister.data.uuid, client: new ApiClient({ token }) };
  }
}
export default ApiClient;
