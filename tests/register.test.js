const faker = require('faker');
const { RegistrationSchema } = require('../schemas/registration');
const { RegisterUserController } = require('../api/controller/register.controller');
const ADD_REGISTRATION_SCHEMA = require('../schemas/registration');

describe('Registration', () => {
  const schema = new RegistrationSchema();
  it('user with valid data', async () => {
    const data = {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };
    const register = new RegisterUserController();
    const response = await register.register(data, schema.addSchema);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('User created successfully.');
  });

  it('user with empty username', async () => {
    const data = {
      username: null,
      password: faker.internet.password(),
    };
    const register = new RegisterUserController();
    const response = await register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe('Username and password are required fields');
  });
});
