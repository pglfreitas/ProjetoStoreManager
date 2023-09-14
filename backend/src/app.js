const express = require('express');
const { productsModel } = require('./models');
const { productsService } = require('./services')
const { productsRoutes } = require('./routes')

const app = express();

app.use('/products', productsRoutes)
app.use('/products/:id', productsRoutes)

// não remova esse endpoint, é para o avaliador funciona
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
