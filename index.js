const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const Users = require('./controller/usersController');
const Login = require('./controller/loginController');
const Categories = require('./controller/categoryController');
const Post = require('./controller/postController');

const validateJWT = require('./middleware/jwtvalidation');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.delete('/user/me', validateJWT, rescue(Users.deleteSelf));
app.get('/user/:id', validateJWT, rescue(Users.getById));
app.post('/user', rescue(Users.add));
app.get('/user', validateJWT, rescue(Users.getAll));

app.post('/login', rescue(Login.login));

app.post('/categories', validateJWT, rescue(Categories.add));
app.get('/categories', validateJWT, rescue(Categories.getAll));

app.get('/post/search', validateJWT, rescue(Post.getBySearchTerm));
app.get('/post/:id', validateJWT, rescue(Post.getById));
app.put('/post/:id', validateJWT, rescue(Post.updateById));
app.delete('/post/:id', validateJWT, rescue(Post.deleteById));
app.post('/post', validateJWT, rescue(Post.add));
app.get('/post', validateJWT, rescue(Post.getAll));

app.use((err, req, res, _next) => {
  const { code, message } = err;
  res.status(code).json({ message });
});