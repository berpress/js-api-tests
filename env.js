// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanEnv, url } from 'envalid';

const CONFIG = cleanEnv(process.env, {
  BASE_URL: url({
    default: 'https://stores-tests-api.herokuapp.com',
    desc: 'API URL to be tested',
  }),
});

export default CONFIG;
