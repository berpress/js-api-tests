// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const ADD_REGISTRATION_SCHEMA = Joi.object({
  message: Joi.string(),
  uuid: Joi.number(),
});

export default ADD_REGISTRATION_SCHEMA;
