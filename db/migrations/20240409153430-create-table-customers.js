'use strict';

/** @type {import('sequelize-cli').Migration} */
const { CustomerSchema, CUSTOMER_TABLE, Customer } = require('./../models/customer.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
