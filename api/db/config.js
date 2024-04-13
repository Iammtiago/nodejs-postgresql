const { Sequelize } = require('sequelize');

const { config } = require('./../config/config.js');

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `${config.database}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// module.exports = {
//   development: {
//     url: URI,
//     dialect: "postgres",
//   },
//   production: {
//     url: URI,
//     dialect: "postgres",
//   }
// }
module.exports = {
  development: {
    url: URI,
    dialect: config.database,
  },
  production: {
    url: URI,
    dialect: config.database,
  }
}
