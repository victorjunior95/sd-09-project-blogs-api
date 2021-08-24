require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const postRoutes = require('./routes/postRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
// const auth = require('./middlewares/auth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(' BlogsApi Server listening on port 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('hello world');
});

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/post', postRoutes);
app.use('/categories', categorieRoutes);
// app.post('/login', auth);
