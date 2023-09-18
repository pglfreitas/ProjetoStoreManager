const { productsService } = require('../services')

const getAllProducts = async (req, res) => {
	const response = await productsService.findAllProducts();
	if (response.status !== 'SUCCESSFUL') {
		return res.status(404).json(response.data)
	}
	return res.status(200).json(response.data);
  };

const getProductsById = async (req, res) => {
	const { id } = req.params
	const response = await productsService.findProductsById(id)
	if (response.status !== 'SUCCESSFUL') {
		return res.status(404).json(response.data)
	}
	return res.status(200).json(response.data)
}

const registerNewProducts = async (req, res) => {
	const { name } = req.body
	const response = await productsService.registerProducts(name)
	return res.status(201).json(response.data)
}

  module.exports = {
	getAllProducts,
	getProductsById,
	registerNewProducts
  }