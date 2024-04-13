/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
// const pool = require('./../libs/postgres.pool.js');
const { models } = require('./../libs/sequelize.js');

class OrderService {

  constructor() {

  }

  async create(data) {
    const rta = await models.Order.create(data);
    return rta;
  }

  async createItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    // const query = 'SELECT * FROM tasks';
    // const response = await this.pool.query(query);
    // return response.rows;

    const rta = await models.Order.findAll();
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    // console.log("ORDER: ", order);
    if (!order) throw boom.notFound('Order not found');

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id)
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id)

    const rta = await order.destroy()
    return { id, rta };
  }

}

module.exports = OrderService;
