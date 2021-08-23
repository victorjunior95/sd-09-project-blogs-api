const { Router } = require('express');
const userController = require('../controllers/userController');
// const { tokenValidation } = require('../middlewares/tokenValidation');

const userRoute = Router();

userRoute
    .post('/', userController.createUser)
    .get('/', userController.getAllUser);
userRoute
    .get('/:id', userController.getById)
    .delete('/:id', userController.deleteUser);
  
module.exports = userRoute;