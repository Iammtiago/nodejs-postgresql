/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize.js');

class CategoryService {

  constructor() {
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const data = await models.Category.findAll();
    return data;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) throw boom.notFound('Category not found');

    return category;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true, model };
  }

}

module.exports = CategoryService;
