// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

class Auth {
  constructor(username = undefined, password = undefined) {
    this.username = username;
    this.password = password;
  }

  random() {
    const login = (this.username === undefined) ? faker.internet.email() : this.username;
    const password = (this.password === undefined) ? faker.internet.password() : this.password;
    return new Auth(login, password);
  }
}

export default Auth;
