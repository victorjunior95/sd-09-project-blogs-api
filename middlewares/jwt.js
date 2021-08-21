const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const result = jwt.verify(authorization, 'secreto');
    console.log(typeof result, result);
    next();
};