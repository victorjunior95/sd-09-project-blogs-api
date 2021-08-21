const jwt = require('jsonwebtoken');
const { BlogPosts, Users, Categories } = require('../models');
require('dotenv').config();

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });
    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { email: data } });
    const userId = user.dataValues.id;

    const post = await BlogPosts.create({ userId, title, content, categoryIds });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getAllPost = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, process.env.JWT_SECRET);

    const post = await BlogPosts.findAll({
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createPost, getAllPost };