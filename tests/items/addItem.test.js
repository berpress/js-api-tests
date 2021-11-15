import ApiClient from '../../api/client';
import Builder from '../../api/builder';
import { Item, ItemBody } from '../../models/itemModel';
import {
  AUTH_ERROR_SCHEMA,
  MESSAGE_SCHEMA,
} from '../../schemas/common';
import { ADD_ITEM_SCHEMA, MESSAGE_SCHEMA_OBJECT } from '../../schemas/item';

describe('Add item', () => {
  it('with valid name', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    builder.build();
    const name = new Item().random();
    const body = new ItemBody(100, builder.store.uuid, 'Test description', 'image.png');
    const response = await client.storeItems.addItem(name.name, body, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(name.name);
  });

  it('with none exist user uuid', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Item().random();
    const body = new ItemBody(100, 1000);
    const response = await client.storeItems.addItem(name.name, body, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(201);
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const name = new Item().random();
    const body = new ItemBody(100, 1000);
    const response = await client.storeItems.addItem(name.name, body, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with double name', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    builder.build();
    const name = new Item().random();
    const body = new ItemBody(100, builder.store.uuid);
    const response = await client.storeItems.addItem(name.name, body, ADD_ITEM_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(name.name);
    const responseDouble = await client.storeItems.addItem(name.name, body, MESSAGE_SCHEMA);
    expect(responseDouble.status).toBe(400);
    expect(responseDouble.data.message).toBe(`An item with name ${name.name} already exists.`);
  });

  it('with invalid price', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Item().random();
    const body = new ItemBody('test', 1000);
    const response = await client.storeItems.addItem(name.name, body, MESSAGE_SCHEMA_OBJECT);
    expect(response.status).toBe(400);
  });
});
