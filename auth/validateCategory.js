const Joi = require('joi');

const categorySchema = Joi.object().keys({
  name: Joi.string().not().empty()
    .required(),
});

const validateCategory = (req, res, next) => {
  const category = req.body;
  const { error } = categorySchema.validate(category);
  if (error) return next(error);

  return next();
};

module.exports = validateCategory;
