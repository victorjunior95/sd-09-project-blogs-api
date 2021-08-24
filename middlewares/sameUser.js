const jwt = require('jsonwebtoken');
const { BlogPosts, Users } = require('../models');
require('dotenv').config();

const autenticUser = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { data } = jwt.verify(token, process.env.JWT_SECRET);

  const postUser = await BlogPosts.findOne({
    where: { id },
  });

  const idUser = await Users.findOne({
    where: { email: data },
  });

  // console.log('POST: ', postUser.dataValues.id);
  // console.log('DATA: ', idUser.id);

  console.log('--------------------> CONSOLE <------------------');
  console.log(postUser.dataValues.id, ' !== ', idUser.id);
  if (postUser.dataValues.id !== idUser.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = { autenticUser };
