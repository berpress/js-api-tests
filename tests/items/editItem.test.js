import ApiClient from '../../api/client';
import Builder from '../../api/builder';
import { Item, ItemBody } from '../../models/itemModel';
import {
  AUTH_ERROR_SCHEMA,
} from '../../schemas/common';
import { ADD_ITEM_SCHEMA } from '../../schemas/item';

describe('Edit item', () => {
  it('with valid name', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    builder.build();
    const name = new Item().random();
    const body = new ItemBody(100, builder.store.uuid);
    const response = await client.storeItems.editItem(name.name, body, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(name.name);
  });

  it('with none exist item', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Item().random();
    const body = new ItemBody(100, 1000);
    const response = await client.storeItems.editItem(name.name, body, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(200);
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const name = new Item().random();
    const body = new ItemBody(100, 1000);
    const response = await client.storeItems.editItem(name.name, body, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });
});
