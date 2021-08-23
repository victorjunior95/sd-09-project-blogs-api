const { validUser } = require('./middlewareUserCreate');
const { createToken } = require('./middlewareUserLogin');
const { nameCategory } = require('./middlewareCategories');
const { validPost } = require('./middlewarePost');
const { validUpdate } = require('./midValidUpdate');

const { auth } = require('./validAuth');

module.exports = {
  validUser,
  createToken,
  nameCategory,
  validPost,
  validUpdate,
  auth,
};
