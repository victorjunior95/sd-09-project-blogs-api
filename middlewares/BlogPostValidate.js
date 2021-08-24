const Joi = require('joi');

module.exports = async (req, _res, next) => {
    const isInputsValid = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().required(),
    }).validate(req.body);
    
    if (isInputsValid.error) {
        isInputsValid.error.statusCode = 400;
        return next(isInputsValid.error);
    }
    next();
};