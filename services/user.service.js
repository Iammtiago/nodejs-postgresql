/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
// const getConnection = require('./../libs/postgres.js');
// const pool = require('./../libs/postgres.pool.js');
// const sequelize = require('./../libs/sequelize.js');
const { models } = require('./../libs/sequelize.js');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // const query = 'SELECT * FROM users';
    //? con la funcion getConnection  ( Client() )
    // const client = await getConnection()
    // response await client.query(query)
    //? con la funcion pool   -   mejor forma y menos coneciones a la db
    // const response = await this.pool.query(query)
    // return response.rows;

    //? trabajando con ORM (sequelize) sin models
    // const [data, metadata] = await sequelize.query(query);
    //? metadata es un objeto mas extenso con mas propiedades
    //? data es mas especifico, mejor usar data
    // return {
    //   data,
    //   metadata
    // }

    //* Utils models orm (POO)
    const user = await models.User.findAll({
      include: ['customer']
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, { include: ['customer'] });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes)

    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
