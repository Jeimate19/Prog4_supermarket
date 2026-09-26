const { Router } = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/saleController');

const saleRouter = Router();

saleRouter.route('/')
  .get(getAll)
  .post(create);

saleRouter.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

module.exports = saleRouter;