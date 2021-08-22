const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../auth/validateToken');
const validatePost = require('../auth/validatePost');

const postController = require('../controllers/Post');

const router = express.Router();

router.post('/', validateToken, rescue(validatePost), rescue(postController.registerPost));

module.exports = router;
