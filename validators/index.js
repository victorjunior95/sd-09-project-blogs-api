const models = require('../models');
/**
 * @type { { BlogPost: import('sequelize/types').ModelType } }
 */
const { BlogPost } = models;

function isEmailInvalid(email) {
    const regex = /.+@.+\..+/;
    return !regex.test(email);
}

function isMinLength(value, min, field) {
    if (value.length < min) {
        return `"${field}" length must be at least ${min} characters long`;
    }
}

function required(fields = [], object) {
    const someField = fields.find((field) => typeof object[field] === 'undefined');
    if (someField) {
        return `"${someField}" is required`;
    }
}
function empty(fields = [], object) {
    const someField = fields.find(
        (field) => typeof object[field] === 'string' && object[field].length === 0,
    );
    if (someField) {
        return `"${someField}" is not allowed to be empty`;
    }
}

const invalidData = (res, message) => res.status(400).json({ message });

module.exports = {
    createUser(req, res, next) {
        const { displayName, email, password } = req.body;
        const requiredResult = required(['displayName', 'email', 'password'], req.body);
        if (requiredResult) {
            return invalidData(res, requiredResult);
        }
        const minResult = isMinLength(displayName, 8, 'displayName');
        if (minResult) {
            return invalidData(res, minResult);
        }
        if (password.length !== 6) {
            return invalidData(res, '"password" length must be 6 characters long');
        }
        if (isEmailInvalid(email)) return invalidData(res, '"email" must be a valid email');
        next();
    },
    login(req, res, next) {
        const requiredFields = required(['email', 'password'], req.body);
        if (requiredFields) {
            return invalidData(res, requiredFields);
        }
        const emptyFields = empty(['email', 'password'], req.body);
        if (emptyFields) {
            return invalidData(res, emptyFields);
        }
        next();
    },
    createPost(req, res, next) {
        const requiredFields = required(['title', 'content', 'categoryIds'], req.body);
        if (requiredFields) {
            return invalidData(res, requiredFields);
        }
        next();
    },
    async authPost(req, res, next) {
        const { user } = req;
        if (!user) throw new Error('Should use jwt middleware before');
        const { id } = req.params;
        const post = await BlogPost.findOne({ where: { id } });
        if (user.id !== post.userId) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        next();
    },
    async updatePost(req, res, next) {
        const requiredFields = required(['title', 'content'], req.body);
        if (requiredFields) {
            return invalidData(res, requiredFields);
        }
        const { categoryIds } = req.body;
        if (categoryIds) {
            return invalidData(res, 'Categories cannot be edited');
        }
        next();
    },
};