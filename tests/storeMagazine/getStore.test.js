import ApiClient from '../../api/client';
import { AUTH_ERROR_SCHEMA, MESSAGE_SCHEMA } from '../../schemas/common';
import Store from '../../models/storeModel';
import ADD_STORE_SCHEMA from '../../schemas/store';

describe('Get store', () => {
  it('with valid name', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Store().random();
    const response = await client.storeMagazine.addStore(name, ADD_STORE_SCHEMA);
    expect(response.status).toBe(201);
    const responseGet = await client.storeMagazine.getStore(name, ADD_STORE_SCHEMA);
    expect(responseGet.status).toBe(200);
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const name = new Store().random();
    const response = await client.storeMagazine.getStore(name, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with none exist name', async () => {
    const { client } = await new ApiClient().authorized();
    const name = new Store().random();
    const response = await client.storeMagazine.getStore(name, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('Store not found');
  });

  test.each([1, true, undefined])(
    'with invalid name',
    async (nameStore) => {
      const { client } = await new ApiClient().authorized();
      const name = new Store(nameStore);
      const response = await client.storeMagazine.getStore(name, MESSAGE_SCHEMA);
      expect(response.status).toBe(404);
      expect(response.data.message).toBe('Store not found');
    },
  );
});
