// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
const faker = require('faker');

class Address {
  constructor(city = undefined, street = undefined, homeNumber = undefined) {
    this.city = city;
    this.street = street;
    this.home_number = homeNumber;
  }

  random() {
    const city = (this.city === undefined) ? faker.address.city() : this.city;
    const street = (this.street === undefined) ? faker.address.streetAddress() : this.street;
    const homeNumber = (this.home_number === undefined) ? faker.phone.phoneNumber()
      : this.home_number;
    return new Address(city, street, homeNumber);
  }
}

class UserInfo {
  constructor(phone = undefined, email = undefined, address = undefined) {
    this.phone = phone;
    this.address = address;
    this.email = email;
  }

  random() {
    const phone = (this.phone === undefined) ? faker.phone.phoneNumber() : this.phone;
    const email = (this.email === undefined) ? faker.internet.email() : this.email;
    const address = (this.address === undefined) ? new Address().random() : this.address;
    return new UserInfo(phone, email, address);
  }
}

export default UserInfo;
