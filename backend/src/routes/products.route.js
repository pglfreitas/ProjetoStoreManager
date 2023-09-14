const route = require('express').Router();
const { productsController } = require('../controllers')

route.get('/', productsController.getAllProducts)
route.get('/:id', productsController.getProductsById)

module.exports = route