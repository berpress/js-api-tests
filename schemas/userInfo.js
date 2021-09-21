// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

export const ADD_USER_INFO_SCHEMA = Joi.object({
  message: Joi.string(),
});

export const GET_USER_INFO_SCHEMA = Joi.object({
  city: Joi.string(),
  street: Joi.string(),
  userID: Joi.number(),
  phone: Joi.string(),
  email: Joi.string(),
});
