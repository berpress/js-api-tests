import ApiClient from '../../api/client';
import Builder from '../../api/builder';
import {
  AUTH_ERROR_SCHEMA,
  MESSAGE_SCHEMA,
} from '../../schemas/common';
import ADD_BALANCE_SCHEMA from '../../schemas/balance';

describe('Get balance', () => {
  it('with valid data', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    await builder.addBalance();
    builder.build();
    const response = await client.balance.getBalance(builder.userId, ADD_BALANCE_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe(`User balance is ${builder.balance.balance}.0`);
    expect(response.data.balance).toBe(builder.balance.balance);
  });

  it('with none exist user id', async () => {
    const userId = 1000;
    const { client } = await new ApiClient().authorized();
    const response = await client.balance.getBalance(userId, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('Balance not found. Add money for user.');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const userId = 1;
    const response = await client.balance.getBalance(userId, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });
});
