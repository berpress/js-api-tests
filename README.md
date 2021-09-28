# JavaScript API tests
[![NodeJS Tests CI](https://github.com/berpress/js-api-tests/actions/workflows/tests.yml/badge.svg)](https://github.com/berpress/js-api-tests/actions/workflows/tests.yml)

![](images/jest.png)


This is a tutorial project that shows how to implement api tests in JS. The test application simulates the operation of a store. 
You can create users, add an item and pay for it.

The project uses:
1. JS
2. Axios (https://github.com/axios/axios)
3. Allure for reports (http://allure.qatools.ru/)
4. CI (GitHub actions)
5. Faker (https://github.com/marak/Faker.js/)


Testing application (write with Flask):

git: https://github.com/berpress/flask-restful-api

url: https://stores-tests-api.herokuapp.com

swagger: https://app.swaggerhub.com/apis/berpress/flask-rest-api/1.0.0

description: https://berpress.github.io/flask-restful-api/ (🇬🇧, 🇷🇺)

### How to start

Use js

Install packages

```
npm install
```

and add pre-commit https://www.npmjs.com/package/husky

Some requests require an authorization token. Use header like 
```angular2html
"Authorization": "JWT {token}"
```

Also, you can use Docker and test this app local
```
docker pull litovsky/flask_store_app
docker run -p 5000:5000 litovsky/flask_store_app
```