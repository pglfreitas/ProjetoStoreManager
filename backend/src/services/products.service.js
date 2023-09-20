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

const registerProducts = async (name) => {
	const result = await productsModel.insert(name)
	return {
		status: 'SUCCESSFUL',
		data: {
			id: result,
			name,
		}
	}
}

const updateProducts = async (id, name) => {
	const result = await productsModel.findById(id)
	if (!result) return {
		status: 'NOT_FOUND', 
		data: { message: 'Product not found'}
	}
	const updateResult = await productsModel.update(id, name)
	return {
		status: 'SUCCESSFUL',
		data: updateResult
	}
}

module.exports = {
	findAllProducts,
	findProductsById,
	registerProducts,
	updateProducts
}