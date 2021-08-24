const { User } = require('../models');

const findUserByEmail = async (email) =>
    User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

const deleteMyAccount = async (id) => User.destroy({ where: { id } });

module.exports = {
    findUserByEmail,
    deleteMyAccount,
};