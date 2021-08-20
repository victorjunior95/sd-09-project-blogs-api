const PostService = require('../services/post');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

try {
  const response = await PostService.create(token, title, content, categoryIds);
  return res.status(response.statusCode).json(response.post);
} catch (error) {
  next(error);
}
};

module.exports = {
  create,
};