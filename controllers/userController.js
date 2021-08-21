const models = require('../models');
/**
 * @type { { User: import('sequelize/types').ModelType } }
 */
const { User } = models;

module.exports = {
    async createUser(req, res) {
        const { displayName, email, password, image } = req.body;
        const alreadyExist = await User.findOne({ where: { email } });
        if (alreadyExist) {
            return res.status(409).json({ message: 'User already registered' });
        }
        await User.create({ displayName, email, password, image });
        res.status(201).json({});
    },
};