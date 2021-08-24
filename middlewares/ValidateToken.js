const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const SECRET = 'essaedificil';

const tryFindUser = async (payload, next) => {
    const user = await UserService.findUserByEmail(payload.email);
    if (!user) {
        const err = new Error('invalid user');
        err.statusCode = 401;
        return next(err);
    }
    return user;
};

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token === '') {
        const err = new Error('Token not found');
        err.statusCode = 401;
        return next(err);
    }
    try {
        const payload = jwt.verify(token, SECRET);
        const user = await tryFindUser(payload, next);
        req.user = user;
        return next();
    } catch (err) {
        err.statusCode = 401;
        err.message = 'Expired or invalid token';
        return next(err);
    }
};
