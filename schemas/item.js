// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

export const ADD_ITEM_SCHEMA = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  itemID: Joi.number(),
});

const PRICE = Joi.object({
  price: Joi.string(),
});

export const MESSAGE_SCHEMA_OBJECT = Joi.object({
  message: PRICE,
});
