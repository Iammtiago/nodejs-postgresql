/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize.js');

class CustomerService {

  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    // una forma interesante de hacerlo
    // const newUser = await models.User.create(data.user)
    // const newCustomer = await models.Customer.create({ ...data, userId: newUser.id});
    // return newCustomer;

    const newCustomer = await models.Customer.create(data, { include: ['user'] });
    return newCustomer;
  }

  async find() {
    const data = await models.Customer.findAll({
      include: ['user']
    })
    return data;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, { include: ['user'] });
    if (!customer) throw boom.notFound('Customer not found');

    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
