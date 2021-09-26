// eslint-disable-next-line max-classes-per-file
import Auth from '../models/authModel';
import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import { AUTH_USER_SCHEMA } from '../schemas/auth';
import ApiClient from './client';
import UserInfo from '../models/userInfoModel';
import { ADD_USER_INFO_SCHEMA } from '../schemas/userInfo';
import Store from '../models/storeModel';
import ADD_STORE_SCHEMA from '../schemas/store';
import { Item, ItemBody } from '../models/itemModel';
import { ADD_ITEM_SCHEMA } from '../schemas/item';

class BuilderStore {
  constructor(builder) {
    this.user = builder.user;
    this.token = builder.token;
    this.userInfo = builder.userInfo;
    this.userId = builder.userId;
    this.store = builder.store;
    this.item = builder.item;
  }
}

class Builder {
  constructor(client) {
    this.client = client;
  }

  async register() {
    const data = new Auth().random();
    const res = await this.client.register.register(data, ADD_REGISTRATION_SCHEMA);
    this.user = data;
    this.userId = res.data.uuid;
    return this;
  }

  async auth() {
    const response = await this.client.auth.auth(this.user, AUTH_USER_SCHEMA);
    this.token = response.data.access_token;
    return this;
  }

  async addInfo() {
    this.client = new ApiClient({ token: this.token });
    const data = new UserInfo().random();
    await this.client.userInfo.addUserInfo(this.userId, data, ADD_USER_INFO_SCHEMA);
    this.userInfo = data;
    return this;
  }

  async addStore() {
    this.client = new ApiClient({ token: this.token });
    const name = new Store().random();
    const response = await this.client.storeMagazine.addStore(name, ADD_STORE_SCHEMA);
    this.store = { name: name.name, uuid: response.data.uuid };
    return this;
  }

  async addItem() {
    this.client = new ApiClient({ token: this.token });
    const name = new Item().random();
    const body = new ItemBody(100, this.store.uuid);
    const response = await this.client.storeItems.addItem(name.name, body, ADD_ITEM_SCHEMA);
    this.item = { name: name.name, price: response.data.price, itemId: response.data.itemID };
    return this;
  }

  build() {
    return new BuilderStore(this);
  }
}
export default Builder;
