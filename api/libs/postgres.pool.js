/* eslint-disable no-unused-vars */
const { Pool } = require('pg');
const { config } = require('./../config/config.js');

//todo: La mejor forma de hacer la conexion a la base de datos (encodeURIComponent y haciendo connectionString)

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

//? no tan buena practica
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'devuser',
//   password: 'devPassword',
//   database: 'my_store'
// });

module.exports = pool;
