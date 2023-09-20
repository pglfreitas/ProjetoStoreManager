const salesModel = require('../models/sales.model');

const productIdValidations = async (req, res, next) => {
const sales = req.body;

const productId = sales.find((products) => products.productId);
if (!productId) {
return res.status(400).json({ message: '"productId" is required' });
}

const allSales = await salesModel.findAll();
const productsExists = sales
.every((productsSales) => allSales.some(
(products) => products.productId === productsSales.productId,
));
if (!productsExists) {
return res.status(404).json({ message: 'Product not found' });
}
next();
};

const quantityValidations = (req, res, next) => {
const sales = req.body;

const undefinedQuantity = sales.find(
(products) => products.quantity === undefined || products.quantity === null,
);
if (undefinedQuantity) {
return res.status(400).json({ message: '"quantity" is required' });
}
const numberQuantity = sales.find((products) => products.quantity <= 0);
if (numberQuantity) {
return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
}

next();
};

module.exports = {
productIdValidations,
quantityValidations,
};