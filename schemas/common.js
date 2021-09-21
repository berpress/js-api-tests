// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

export const AUTH_ERROR_SCHEMA = Joi.object({
  description: Joi.string(),
  error: Joi.string(),
  status_code: Joi.number(),
});

export const MESSAGE_SCHEMA = Joi.object({
  message: Joi.string(),
});
