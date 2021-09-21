import ApiClient from '../../api/client';
import UserInfo from '../../models/userInfoModel';
import { ADD_USER_INFO_SCHEMA } from '../../schemas/userInfo';
import { AUTH_ERROR_SCHEMA } from '../../schemas/common';

describe('Add user info', () => {
  it('with valid data', async () => {
    const { userId, client } = await new ApiClient().authorized();
    const data = new UserInfo().random();
    const response = await client.userInfo.addUserInfo(userId, data, ADD_USER_INFO_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('User info created successfully.');
  });

  it('with out access token', async () => {
    const client = await new ApiClient().unauthorized();
    const data = new UserInfo().random();
    const response = await client.userInfo.addUserInfo(1, data, AUTH_ERROR_SCHEMA);
    expect(response.status).toBe(401);
    expect(response.data.description).toBe('Request does not contain an access token');
    expect(response.data.error).toBe('Authorization Required');
    expect(response.data.status_code).toBe(401);
  });
});
