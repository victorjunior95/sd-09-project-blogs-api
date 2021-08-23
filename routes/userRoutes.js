const { Router } = require('express');
const userController = require('../controllers/userController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const userRoute = Router();

userRoute
    .post('/', userController.createUser)
    .get('/', tokenValidation, userController.getAllUser);
userRoute
    .get('/:id', tokenValidation, userController.getById)
    .delete('/:id', tokenValidation, userController.deleteUser);
  
module.exports = userRoute;