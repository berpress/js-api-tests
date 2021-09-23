// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const ADD_STORE_SCHEMA = Joi.object({
  name: Joi.string(),
  items: Joi.array(),
});

export default ADD_STORE_SCHEMA;
