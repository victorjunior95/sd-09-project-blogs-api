const { getPostById } = require('../services/PostService');

module.exports = async (req, _res, next) => {
    const userId = req.user.id;
    const { id } = req.params;

    const post = await getPostById(id);

    if (post.userId !== userId) {
        const err = new Error('Unauthorized user');
        err.statusCode = 401;
        return next(err);
    }
   
    return next();
  };