const jwt = require('jsonwebtoken');
const models = require('../models');
/**
 * @type { { User: import('sequelize/types').ModelType } }
 */
const { User } = models;

function mapUser(user) {
    return {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
    };
}

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
    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        const token = jwt.sign(
            { email: user.email },
            'secreto',
            { expiresIn: '1d', algorithm: 'HS256' },
        );
        res.status(200).json({ token });
    },
    async getAll(req, res) {
        const users = await User.findAll();
        res.status(200).json(users.map(mapUser));
    },
};