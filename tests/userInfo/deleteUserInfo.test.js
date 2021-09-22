import ApiClient from '../../api/client';
import UserInfo from '../../models/userInfoModel';
import { ADD_USER_INFO_SCHEMA } from '../../schemas/userInfo';
import { AUTH_ERROR_SCHEMA, MESSAGE_SCHEMA } from '../../schemas/common';

describe('Delete user info', () => {
  it('with valid data', async () => {
    const { userId, client } = await new ApiClient().authorized();
    const data = new UserInfo().random();
    const response = await client.userInfo.addUserInfo(userId, data, ADD_USER_INFO_SCHEMA);
    expect(response.status).toBe(200);
    const responseDelete = await client.userInfo.deleteUserInfo(userId, MESSAGE_SCHEMA);
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.data.message).toBe('User info deleted.');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const response = await client.userInfo.deleteUserInfo(1, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });

  it('with none exist user', async () => {
    const { client } = await new ApiClient().authorized();
    const response = await client.userInfo.deleteUserInfo(10000, MESSAGE_SCHEMA);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe('User info not found.');
  });
});
