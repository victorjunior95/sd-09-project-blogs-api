const router = require('express').Router();
const { UserController } = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/', UserController.create);
router.get('/', auth, UserController.getAll);
router.get('/:id', auth, UserController.getById);

module.exports = router;