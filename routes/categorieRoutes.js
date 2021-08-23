const { Router } = require('express');
const categorieController = require('../controllers/categorieController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const categorieRoute = Router();

categorieRoute
    .post('/', tokenValidation, categorieController.createCategory)
    .get('/', tokenValidation, categorieController.getAllCategories);

module.exports = categorieRoute;