// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const AUTH_USER_SCHEMA = Joi.object({
  access_token: Joi.string(),
});

export default AUTH_USER_SCHEMA;
