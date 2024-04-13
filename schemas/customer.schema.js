
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(18);
const lastName = Joi.string().min(3).max(27);
const phone = Joi.string().min(7).max(16);
const userId = Joi.number().integer();

const nameUser = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(7);
const role = Joi.string().min(5);

const getCustomerSchema = Joi.object({
  id: id.required(),
  name: name,
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  // userId: userId.required()

  user: Joi.object({
    name: nameUser.required(),
    email: email.required(),
    password: password.required(),
    role: role
  })

});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});


module.exports = {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema
}
