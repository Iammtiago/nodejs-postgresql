'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
