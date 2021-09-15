import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import ApiClient from '../api/client';

const faker = require('faker');

describe('Registration', () => {
  it('user with valid data', async () => {
    const client = new ApiClient();
    const data = {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('User created successfully.');
  });

  it('user with empty username', async () => {
    const client = new ApiClient();
    const data = {
      username: null,
      password: faker.internet.password(),
    };
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe('Username and password are required fields');
  });

  it('user with empty password', async () => {
    const client = new ApiClient();
    const data = {
      username: faker.internet.email(),
      password: null,
    };
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe('Username and password are required fields');
  });
});
