import ApiClient from '../../api/client';
import UserInfo from '../../models/userInfoModel';
// eslint-disable-next-line import/named
import { GET_USER_INFO_SCHEMA, ADD_USER_INFO_SCHEMA } from '../../schemas/userInfo';
import { MESSAGE_SCHEMA, AUTH_ERROR_SCHEMA } from '../../schemas/common';

describe('Get user info', () => {
  it('with valid uuid', async () => {
    const { userId, client } = await new ApiClient().authorized();
    const data = new UserInfo().random();
    const response = await client.userInfo.addUserInfo(userId, data, ADD_USER_INFO_SCHEMA);
    expect(response.status).toBe(200);
    const responseGet = await client.userInfo.getUserInfo(userId, GET_USER_INFO_SCHEMA);
    expect(responseGet.status).toBe(200);
    expect(responseGet.data.city).toBe(data.address.city);
    expect(responseGet.data.street).toBe(data.address.street);
    expect(responseGet.data.email).toBe(data.email);
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const response = await client.userInfo.getUserInfo(1, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with none exist user', async () => {
    const { client } = await new ApiClient().authorized();
    const response = await client.userInfo.getUserInfo(10000, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('User info not found');
  });

  it('with invalid user uuid', async () => {
    const { client } = await new ApiClient().authorized();
    const response = await client.userInfo.getUserInfo('10000', MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('User info not found');
  });
});
