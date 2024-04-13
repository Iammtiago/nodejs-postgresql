const express = require('express');

const router = express.Router();
const OrderService = require('./../services/order.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js')
const { getOrderSchema, createOrderSchema, addItemSchema } = require('./../schemas/order.schema.js')

const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      res.status(201).json(await service.create(data));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;
      res.json(await service.update(id, data));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(201).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);



//# add-item


router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newItem = await service.createItem(data);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
