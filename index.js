const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middlewares/error');
const validateJWT = require('./middlewares/validateJWT');
const User = require('./controllers/User');
const Categories = require('./controllers/Categories');
const Post = require('./controllers/Post');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.get('/user', validateJWT, User.getAll);
app.get('/user/:id', validateJWT, User.getById);
app.get('/categories', validateJWT, Categories.getAll);
app.get('/post', validateJWT, Post.getAll);
app.get('/post/:id', validateJWT, Post.getById);
app.post('/user', User.create);
app.post('/login', User.login);
app.post('/categories', validateJWT, Categories.create);
app.post('/post', validateJWT, Post.create);
app.put('/post/:id', validateJWT, Post.editOne);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
