import ApiClient from '../../api/client';
import UserInfo from '../../models/userInfoModel';
import ADD_USER_INFO_SCHEMA from '../../schemas/userInfo';

describe('Add user info', () => {
  it('with valid data', async () => {
    const { userId, client } = await new ApiClient().authorized();
    const data = new UserInfo().random();
    const response = await client.userInfo.addUserInfo(userId, data, ADD_USER_INFO_SCHEMA);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('User info created successfully.');
  });
});
