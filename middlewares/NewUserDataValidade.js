const Joi = require('joi');

module.exports = async (req, _res, next) => {
    const isInputsValid = Joi.object({
        displayName: Joi.string().min(8),
        email: Joi.string().email().required(),
        password: Joi.string().length(6).required(),
        image: Joi.string(),
    }).validate(req.body);

    if (isInputsValid.error) {
        isInputsValid.error.statusCode = 400;
        return next(isInputsValid.error);
    }
    
    next();
};