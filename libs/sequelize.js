const { Sequelize } = require('sequelize');

const { config } = require('./../config/config.js');
const setupModels = require('./../db/models/index.js');

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `${config.database}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: config.database,
  logging: true,
});

setupModels(sequelize)

// sequelize.sync(); // con migrations no se trabaja con sync()

module.exports = sequelize
