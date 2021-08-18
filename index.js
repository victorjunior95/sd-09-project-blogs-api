const express = require('express');
const bodyParser = require('body-parser');
require('dotenv');
const userController = require('./controllers/user');
const { userIsValid, loginIsValid } = require('./middlewares/userIsValid');
const { tokenIsValid } = require('./middlewares/tokenIsValid');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`ouvindo porta ${PORT}!`));

app.post('/user', userIsValid, userController.create);
app.post('/login', loginIsValid, userController.login);
app.get('/user', tokenIsValid, userController.getAll);
app.get('/user/:id', tokenIsValid, userController.getById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;