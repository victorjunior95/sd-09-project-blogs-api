const jwt = require('jsonwebtoken');
const models = require('../models');

/**
 * @type { {User: import('sequelize/types').ModelType } }
 */
const { User } = models;

module.exports = {
    jwt: async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Token not found' });
        }
        try {
            const result = jwt.verify(authorization, 'secreto');
            
            if (!result) {
                res.status(401).json({});
            }
            const user = await User.findOne({ where: { email: result.email } });
            if (!user) {
                throw new Error('');
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Expired or invalid token' });
        }
    },
};