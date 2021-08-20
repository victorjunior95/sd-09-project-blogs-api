const router = require('express').Router();
const { PostController } = require('../controllers');
const AuthMiddleware = require('../middlewares/auth');

router.post('/', AuthMiddleware, PostController.create);

module.exports = router;