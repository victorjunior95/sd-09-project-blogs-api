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

module.exports = {
    createUser(req, res, next) {
        const { displayName, email, password } = req.body;
        const invalidData = (message) => res.status(400).json({ message });
        const requiredResult = required(['displayName', 'email', 'password'], req.body);
        if (requiredResult) {
            return invalidData(requiredResult);
        }
        const minResult = isMinLength(displayName, 8, 'displayName');
        if (minResult) {
            return invalidData(minResult);
        }
        if (password.length !== 6) {
            return invalidData('"password" length must be 6 characters long');
        }
        if (isEmailInvalid(email)) return invalidData('"email" must be a valid email');
        next();
    },
};