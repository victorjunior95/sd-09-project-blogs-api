const jwt = require('jsonwebtoken');
const { BlogPosts, Users, Categories } = require('../models');
require('dotenv').config();

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;

    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { email: data } });
    const userId = user.dataValues.id;

    const post = await BlogPosts.create({ userId, title, content, categoryIds });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await BlogPosts.findAll({
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;

    const postById = await BlogPosts.findByPk((id), {
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!postById) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(postById);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const putPostsById = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    await BlogPosts.update({ title, content }, { where: { id } });

    const response = await BlogPosts.findOne({
      where: { id },
      attributes: { exclude: ['id', 'published', 'updated'] },
      include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const delPostsById = async (req, res) => {
  try {
    const { id } = req.params;

    await BlogPosts.destroy({ where: { id } });
    return res.status(204).end();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = { createPost, getAllPost, getPostsById, putPostsById, delPostsById };