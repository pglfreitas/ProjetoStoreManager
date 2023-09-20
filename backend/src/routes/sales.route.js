const route = require('express').Router();
const { salesController } = require('../controllers');
const { productIdValidations, quantityValidations } = require('../middlewares/salesValidations');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSalesById);
route.post('/', productIdValidations, quantityValidations, salesController.registerNewSales);

module.exports = route;