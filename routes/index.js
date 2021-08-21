const router = require('express').Router();
const { UserController } = require('../controllers');
const middlewares = require('../middlewares');
const validators = require('../validators');

router.post('/user', validators.createUser, UserController.createUser);
router.post('/login', validators.login, UserController.login);
router.get('/user', middlewares.jwt, UserController.getAll);
router.get('/user/:id', middlewares.jwt, UserController.getUser);

module.exports = router;