const faker = require('faker');

import {RegisterUserController} from '../api/controller/register.controller'

describe('Registration', function () {
    it('user with valid data', async function () {
        const data = {
                username: faker.internet.email(),
                password: faker.internet.password()
            }
        const register = new RegisterUserController();
        const response = await register.register(data);
        console.log(response.data);
        expect(response.status).toBe(201);
        expect(response.data.message).toBe('User created successfully.')
        })
})