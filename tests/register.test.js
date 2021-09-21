import ApiClient from '../api/client';
import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import Auth from '../models/authModel';
import { MESSAGE_SCHEMA } from '../schemas/common';

describe('Registration', () => {
  it('user with valid data', async () => {
    const client = new ApiClient();
    const data = new Auth().random();
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('User created successfully.');
  });

  it('user with empty username', async () => {
    const client = new ApiClient();
    const data = new Auth(null, 'Password');
    const response = await client.register.register(data, MESSAGE_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe('Username and password are required fields');
  });

  it('user with empty password', async () => {
    const client = new ApiClient();
    const data = new Auth(undefined, null).random();
    const response = await client.register.register(data, MESSAGE_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe('Username and password are required fields');
  });
});
