const Joi = require('joi');
const { User } = require('../models');

const doesUserExists = async (email, next) => {
    try {
        const doesEmailAlreadyExists = await User.findOne({ where: { email } });
        if (!doesEmailAlreadyExists) {
            const err = new Error('Invalid fields');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = async (req, _res, next) => {
    
    const isInputsValid = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().length(6).required(),
    }).validate(req.body);
    
    if (isInputsValid.error) {
        isInputsValid.error.statusCode = 400;
        return next(isInputsValid.error);
    }
    
    await doesUserExists(req.body.email, next);
    
    next();
};