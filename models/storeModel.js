// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

class Store {
  constructor(name = undefined) {
    this.name = name;
  }

  random() {
    const name = (this.username === undefined) ? faker.name.firstName() : this.name;
    return new Store(name);
  }
}

export default Store;
