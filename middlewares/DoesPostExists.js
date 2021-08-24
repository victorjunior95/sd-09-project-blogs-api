const { 
    getPostById,
} = require('../services/PostService');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    const postFoundByID = await getPostById(id);
        if (!postFoundByID) {
            const err = new Error('Post does not exist');
            err.statusCode = 404;
            return next(err);
        }
        return next();
};