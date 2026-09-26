const { Router } = require('express');
const { 
  getAll, 
  getOne, 
  create, 
  update, 
  remove 
} = require('../controllers/userController');

const userRouter = Router();

userRouter.route('/')
  .get(getAll)
  .post(create);

userRouter.route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

module.exports = userRouter;