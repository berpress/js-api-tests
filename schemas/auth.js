// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

export const AUTH_USER_SCHEMA = Joi.object({
  access_token: Joi.string(),
});

export const AUTH_USER_ERROR_SCHEMA = Joi.object({
  description: Joi.string(),
  error: Joi.string(),
  status_code: Joi.number(),
});
