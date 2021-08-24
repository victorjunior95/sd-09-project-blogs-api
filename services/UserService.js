const { User } = require('../models');

const findUserByEmail = async (email) =>
    User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

module.exports = {
    findUserByEmail,
};