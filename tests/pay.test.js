import ApiClient from '../api/client';
import Builder from '../api/builder';
import {
  AUTH_ERROR_SCHEMA,
  MESSAGE_SCHEMA,
} from '../schemas/common';
import ADD_BALANCE_SCHEMA from '../schemas/balance';
import Pay from '../models/payModel';
import PAY_SCHEMA from '../schemas/pay';
import Balance from '../models/balanceModel';

describe('Pay', () => {
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
    const data = new Pay(builder.item.itemId);
    const response = await client.pay.pay(builder.userId, data, PAY_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Payment was successful');
    expect(response.data.balance).toBe(builder.balance.balance - builder.item.price);
    expect(response.data.price).toBe(builder.item.price);
  });

  it('with none exist user id', async () => {
    const userId = 1000;
    const { client } = await new ApiClient().authorized();
    const data = new Pay(1);
    const response = await client.pay.pay(userId, data, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('User not found');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const userId = 1;
    const data = new Pay(1);
    const response = await client.pay.pay(userId, data, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with none exist item id', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    await builder.addBalance();
    builder.build();
    const data = new Pay(1000);
    const response = await client.pay.pay(builder.userId, data, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('Item not found');
  });

  it('with value of the goods is greater than the balance', async () => {
    const { client } = await new ApiClient().authorized();
    const builder = await new Builder(client);
    await builder.register();
    await builder.auth();
    await builder.addInfo();
    await builder.addStore();
    await builder.addItem();
    builder.build();
    const balance = 10;
    const dataBalance = new Balance(balance).random();
    const responseBalance = await client.balance.addBalance(builder.userId, dataBalance,
      ADD_BALANCE_SCHEMA);
    expect(responseBalance.status).toBe(201);
    const data = new Pay(builder.item.itemId);
    const response = await client.pay.pay(builder.userId, data, MESSAGE_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe(`Not enough money. Your balance is ${balance}.0, item cost ${builder.item.price}.0`);
  });
});
