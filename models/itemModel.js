// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
const faker = require('faker');

export class Item {
  constructor(name = undefined) {
    this.name = name;
  }

  random() {
    const name = (this.username === undefined) ? faker.name.firstName() : this.name;
    return new Item(name);
  }
}

export class ItemBody {
  constructor(price = undefined, id = undefined,
    description = undefined, image = undefined) {
    this.price = price;
    this.store_id = id;
    this.description = description;
    this.image = image;
  }

  random() {
    const price = (this.price === undefined) ? 100 : this.price;
    const id = (this.store_id === undefined) ? 1 : this.store_id;
    const description = (this.description === undefined) ? 'Test description' : this.description;
    const image = (this.image === undefined) ? 'test.png' : this.store_id;
    return new ItemBody(price, id, description, image);
  }
}
