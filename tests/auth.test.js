import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import AUTH_USER_SCHEMA from '../schemas/auth';

import ApiClient from '../api/client';

const faker = require('faker');

describe('Auth', () => {
  it('user with valid data', async () => {
    const client = new ApiClient();
    const data = {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('User created successfully.');
    const responseAuth = await client.auth.auth(data, AUTH_USER_SCHEMA);
    expect(responseAuth.status).toBe(200);
  });
});
