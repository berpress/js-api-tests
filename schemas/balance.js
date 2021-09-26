// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const ADD_BALANCE_SCHEMA = Joi.object({
  message: Joi.string(),
  balance: Joi.number(),
});

export default ADD_BALANCE_SCHEMA;
