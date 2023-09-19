const salesModel = require('../models/sales.model')

const findAllSales = async () => {
	const result = await salesModel.findAll()
	return { 
		status: 'SUCCESSFUL', 
		data: result
	}
}

const findSalesById = async (id) => {
	const result = await salesModel.findById(id)
	if (result.length === 0 ) return { 
		status: 'NOT_FOUND', 
		data: { message: 'Sale not found'}
	}
	return {
		status: 'SUCCESSFUL',
		data: result
	}
}

const registerSales = async (sales) => {
	const result = await salesModel.insert(sales)
	if (result.length === 0 ) return { 
		status: 'NOT_FOUND', 
		data: { message: 'Sale not found'}
	}
	return {
		status: 'SUCCESSFUL',
		data: result
	}
}

module.exports = {
	findAllSales,
	findSalesById,
	registerSales
}