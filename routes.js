const router = require('express').Router();
const User = require('./controllers/user');
const Categorie = require('./controllers/categorie');
const { validateToken } = require('./middlewares/validateToken');

router.post('/user', User.create);
router.post('/login', User.login);
router.get('/user', validateToken, User.getAllUsers);
router.get('/user/:id', validateToken, User.getUserById);

router.post('/categories', validateToken, Categorie.create);
router.get('/categories', validateToken, Categorie.getAllCategories);

module.exports = router;