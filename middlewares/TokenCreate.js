const jwt = require('jsonwebtoken');
require('dotenv').config();

const TokenCreate = async (payload) => {
    const jwtConfig = {
        expiresIn: '25m',
        algorithm: 'HS256',
    };
    const token = jwt.sign(payload, process.env.SECRET, jwtConfig);
    return token;
};

module.exports = {
    TokenCreate,
};
