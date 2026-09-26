const { Router } = require('express');
const { 
  getAll, 
  getOne, 
  create, 
  update, 
  remove 
} = require('../controllers/providerController');

const providerRouter = Router();

providerRouter.route('/')
  .get(getAll)
  .post(create);

providerRouter.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

module.exports = providerRouter;