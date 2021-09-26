import ApiClient from '../../api/client';
import Builder from '../../api/builder';
import { Item } from '../../models/itemModel';
import {
  AUTH_ERROR_SCHEMA,
  MESSAGE_SCHEMA,
} from '../../schemas/common';
import { ADD_ITEM_SCHEMA } from '../../schemas/item';

describe('Get item', () => {
  it('with valid name', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    builder.build();
    const response = await client.storeItems.getItem(builder.item.name, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(builder.item.name);
  });

  it('with none exist item name', async () => {
    const noneExistName = 'TEST_TEST';
    const { client } = await new ApiClient().authorized();
    const response = await client.storeItems.getItem(noneExistName, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('Item not found');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const name = new Item().random();
    const response = await client.storeItems.getItem(name.name, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });
});
