const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', require('./routes/users.routes'));
app.use('/login', require('./routes/login.routes'));
app.use('/categories', require('./routes/categories.routes'));
app.use('/post', require('./routes/posts.routes'));

module.exports = app;
