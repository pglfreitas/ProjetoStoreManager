const route = require('express').Router();
const { productsController } = require('../controllers')
const { productsMiddlewares } = require('../middlewares')

route.get('/', productsController.getAllProducts)
route.get('/:id', productsController.getProductsById)
route.post('/', productsMiddlewares, productsController.registerNewProducts)

module.exports = route