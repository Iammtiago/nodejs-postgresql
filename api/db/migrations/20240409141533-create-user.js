'use strict';

/** @type {import('sequelize-cli').Migration} */
const { UserSchema, USER_TABLE, User } = require('./../models/user.model.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
    *
    * Example:
    * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(USER_TABLE);

  }
};
