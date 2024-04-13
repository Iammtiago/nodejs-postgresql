/* eslint-disable no-unused-vars */
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize.js');
const { Op } = require('sequelize');

class ProductsService {

  constructor() {
    // this.generate();
  }

  async generate() {
    const limit = 27;
    for (let index = 0; index < limit; index++) {
      // this.products.push({
      //   id: faker.datatype.uuid(),
      //   name: faker.commerce.productName(),
      //   price: parseInt(faker.commerce.price(), 10),
      //   image: faker.image.imageUrl(),
      //   isBlock: faker.datatype.boolean(),
      // });

      const newProduct = await models.Product.create({
        //id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
        categoryId: 3
      })
    }
  }

  async create(data) {
    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    const rta = await models.Product.create(data);

    return rta;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {} // para filtrar por precios
    }

    const { limit, offset, price, price_min, price_max } = query
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price) {
      options.where.price = price;

    }

    if (price_min, price_min) {
      options.where.price = {
        [Op.gte]: price_min, //mayor o igual
        [Op.lte]: price_max, // menor o igual
      }
    }

    //la mejor forma para hacerlo
    const products = await models.Product.findAll(options);

    // const products = await models.Product.findAll({
    //   include: ['category'],
    //   offset: 0,
    //   limit: 9
    // });

    return products;
  }

  async findOne(id) {
    // const product = this.products.find(item => item.id === id);
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });

    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    // const index = this.products.findIndex(item => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes
    // };

    // return this.products[index];
    const model = await this.findOne(id)
    const product = await model.update(changes);
    return product;
    // const product = await models.Products.update(changes, { where: { id } });
  }

  async delete(id) {
    // const index = this.products.findIndex(item => item.id === id);

    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // this.products.splice(index, 1);

    const model = await this.findOne(id)

    const rta = await model.destroy()
    return { id, model };
  }

}

module.exports = ProductsService;
