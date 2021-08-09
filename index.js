const express = require('express');
const bodyParse = require('body-parser');
const router = require('./routers/router');
const error = require('./middlewares/error');
require('dotenv').config();

const app = express();
app.use(bodyParse.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);
app.use(error);
