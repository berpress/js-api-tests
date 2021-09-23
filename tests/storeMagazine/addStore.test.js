import ApiClient from '../../api/client';
import { AUTH_ERROR_SCHEMA, MESSAGE_SCHEMA } from '../../schemas/common';
import Store from '../../models/storeModel';
import ADD_STORE_SCHEMA from '../../schemas/store';

describe('Add store', () => {
  it('with valid name', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Store().random();
    const response = await client.storeMagazine.addStore(name, ADD_STORE_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(name.name);
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const name = new Store().random();
    const response = await client.storeMagazine.addStore(name, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with exist name', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Store().random();
    const response = await client.storeMagazine.addStore(name, ADD_STORE_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(name.name);
    const responseDouble = await client.storeMagazine.addStore(name, MESSAGE_SCHEMA);
    expect(responseDouble.status).toBe(400);
    expect(responseDouble.data.message).toBe(`A store with name '${name.name}' already exists.`);
  });
});
