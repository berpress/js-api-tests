// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const PAY_SCHEMA = Joi.object({
  message: Joi.string(),
  balance: Joi.number(),
  name: Joi.string(),
  price: Joi.number(),
});

export default PAY_SCHEMA;
