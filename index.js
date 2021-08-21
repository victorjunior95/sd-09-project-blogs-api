const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
