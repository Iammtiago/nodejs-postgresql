'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'isBlock', ProductSchema.isBlock);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'isBlock');
  }
};
