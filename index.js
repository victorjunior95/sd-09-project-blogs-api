const express = require('express');
const bodyParser = require('body-parser');

const error = require('./middlewares/error');
const routerUser = require('./routes/Users');
const routerLogin = require('./routes/Login');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routerUser);
app.use('/login', routerLogin);

app.use(error);

module.exports = app;
