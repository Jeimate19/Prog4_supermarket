const { Router } = require('express');
const { 
  getAll, 
  getOne, 
  create, 
  update, 
  remove 
} = require('../controllers/productController');

const productRouter = Router();

productRouter.route('/')
  .get(getAll)
  .post(create);

productRouter.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

module.exports = productRouter;