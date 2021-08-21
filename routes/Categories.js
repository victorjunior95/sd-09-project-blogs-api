const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../auth/validateToken');
const validateCategory = require('../auth/validateCategory');

const categoryController = require('../controllers/Categories');

const router = express.Router();

router.post('/', validateToken,
  rescue(validateCategory),
  rescue(categoryController.registerCategories));

module.exports = router;
