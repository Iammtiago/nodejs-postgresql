'use strict';

/** @type {import('sequelize-cli').Migration} */

const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/order-product.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
