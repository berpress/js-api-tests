const axios = require("axios");
const faker = require('faker');
baseUrl = 'https://stores-tests-api.herokuapp.com'

describe('Registration', function () {
    it('user with valid data', async function () {
        const data = {
                username: faker.internet.email(),
                password: faker.internet.password()
            }
        const response = await axios.post(`${baseUrl}/register`, data);
        console.log(response.data);
        expect(response.status).toBe(201);
        })
})