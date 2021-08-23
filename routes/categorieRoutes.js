const { Router } = require('express');
const categorieController = require('../controllers/categorieController');
// const { tokenValidation } = require('../middlewares/tokenValidation');

const categorieRoute = Router();

categorieRoute
    .post('/', categorieController.createCategory)
    .get('/', categorieController.getAllCategories);

module.exports = categorieRoute;