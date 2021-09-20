// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const ADD_USER_INFO_SCHEMA = Joi.object({
  message: Joi.string(),
});

export default ADD_USER_INFO_SCHEMA;
