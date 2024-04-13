const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(25);
const price = Joi.number();
const description = Joi.string().min(3).max(27);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const isBlock = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number();
const price_max = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  isBlock
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId,
  isBlock
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when("price_min", {
    is: Joi.number(),
    then: Joi.required()
  }),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
