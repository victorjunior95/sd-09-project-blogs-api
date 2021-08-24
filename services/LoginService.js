const { TokenCreate } = require('../middlewares/TokenCreate');

const makeLoginService = async (displayName, email, image, id) => {
    const token = await TokenCreate({ displayName, email, image, id });
    return token;
};

module.exports = {
    makeLoginService,
};