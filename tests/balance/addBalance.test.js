import ApiClient from '../../api/client';
import Builder from '../../api/builder';
import {
  AUTH_ERROR_SCHEMA,
  MESSAGE_SCHEMA,
} from '../../schemas/common';
import Balance from '../../models/balanceModel';
import ADD_BALANCE_SCHEMA from '../../schemas/balance';

describe('Update balance', () => {
  it('with valid data', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    builder.build();
    const data = new Balance().random();
    const response = await client.balance.addBalance(builder.userId, data, ADD_BALANCE_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe(`User balance has been updated. New balance is ${data.balance}.0`);
    expect(response.data.balance).toBe(data.balance);
  });

  it('with none exist user id', async () => {
    const userId = 1000;
    const { client } = await new ApiClient().authorized();
    const data = new Balance().random();
    const response = await client.balance.addBalance(userId, data, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('User not found.');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const userId = 1;
    const data = new Balance().random();
    const response = await client.balance.addBalance(userId, data, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });
});
