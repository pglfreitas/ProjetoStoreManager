const productsModel = require('../models/products.model')

const findAllProducts = async () => {
	const result = await productsModel.findAll()
	return { 
		status: 'SUCCESSFUL', 
		data: result
	}
}

const findProductsById = async (id) => {
	const result = await productsModel.findById(id)
	if (!result) return { 
		status: 'NOT_FOUND', 
		data: { message: 'Product not found'}
	}
	return {
		status: 'SUCCESSFUL',
		data: result
	}
}

module.exports = {
	findAllProducts,
	findProductsById,
}