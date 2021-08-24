const Joi = require('joi');

module.exports = async (req, _res, next) => {
    if (req.body.categoryIds) {
        const err = new Error('Categories cannot be edited');
        err.statusCode = 400;
        return next(err);
    }
    
    const isInputsValid = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    }).validate(req.body);
    
    if (isInputsValid.error) {
        isInputsValid.error.statusCode = 400;
        return next(isInputsValid.error);
    }
    return next();
  };