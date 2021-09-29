const express = require('express');
const bodyParser = require('body-parser');

const error = require('./middlewares/error');
const routerUser = require('./routes/Users');
const routerLogin = require('./routes/Login');
const routerCategories = require('./routes/Categories');
const routerPost = require('./routes/Post');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routerUser);
app.use('/login', routerLogin);
app.use('/categories', routerCategories);
app.use('/post', routerPost);

app.use(error);

module.exports = app;
