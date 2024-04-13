'use strict';

/** @type {import('sequelize-cli').Migration} */
const { UserSchema, USER_TABLE, User } = require('./../models/user.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
