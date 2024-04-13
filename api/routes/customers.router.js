const express = require('express');

const CustomerService = require('../services/customer.service.js');
const validationHandler = require('../middlewares/validator.handler.js');

const validatorHandler = require('../middlewares/validator.handler.js');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema
} = require('../schemas/customer.schema.js');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      res.status(201).json(await service.create(body))
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/id/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
)

router.put('/id/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/id/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router
