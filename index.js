const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middlewares/error');
const User = require('./controllers/User');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/user', User.create);
app.post('/login', User.login);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
