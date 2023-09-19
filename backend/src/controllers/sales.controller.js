const { salesService } = require('../services')

const getAllSales = async (req, res) => {
	const response = await salesService.findAllSales();
	if (response.status !== 'SUCCESSFUL') {
		return res.status(404).json(response.data)
	}
	return res.status(200).json(response.data);
  };

const getSalesById = async (req, res) => {
	const { id } = req.params
	const response = await salesService.findSalesById(id)
	if (response.status !== 'SUCCESSFUL') {
		return res.status(404).json(response.data)
	}
	return res.status(200).json(response.data)
}

const registerNewSales = async (req, res) => {
	const sales = req.body
	const response = await salesService.registerSales(sales)
	if (response.status !== 'SUCCESSFUL') {
		return res.status(404).json(response.data)
	}
	return res.status(201).json(response.data)
}

  module.exports = {
	getAllSales,
	getSalesById,
	registerNewSales
  }