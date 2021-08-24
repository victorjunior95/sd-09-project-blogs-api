const { validUser } = require('./middlewareUserCreate');
const { createToken } = require('./middlewareUserLogin');
const { nameCategory } = require('./middlewareCategories');
const { validPost } = require('./middlewarePost');
const { validUpdate } = require('./midValidUpdate');
const { auth } = require('./validAuth');
const { autenticUser } = require('./sameUser');

module.exports = {
  validUser,
  createToken,
  nameCategory,
  validPost,
  validUpdate,
  auth,
  autenticUser,
};
