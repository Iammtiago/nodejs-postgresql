'use strict';

/** @type {import('sequelize-cli').Migration} */

const { OrderSchema, ORDER_TABLE } = require('./../models/order.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
