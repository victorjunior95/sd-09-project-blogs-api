const router = require('express').Router();
const User = require('./controllers/user');
const { validateToken } = require('./middlewares/validateToken');

router.post('/user', User.create);
router.post('/login', User.login);
router.get('/user', validateToken, User.getAllUsers);
router.get('/user/:id', validateToken, User.getUserById);

module.exports = router;