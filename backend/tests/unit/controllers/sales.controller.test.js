const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/sales.model')
const salesService = require('../../../src/services/sales.service')
const salesController = require('../../../src/controllers/sales.controller')
const salesMock = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('sales Controller', function () {
	it('Get all sales', async function() {
		const req = {}
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		sinon.stub(salesService, 'findAllSales').resolves({
			status: 'SUCCESSFUL',
			data: salesMock
		})
		await salesController.getAllSales(req, res)
		expect(res.status).to.have.been.calledWith(200)
		expect(res.json).to.have.been.calledWith(salesMock)

	})
	it('Get sales by id that exists', async function() {
		const req = { params: { id: 1 } }
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		sinon.stub(salesService, 'findSalesById').resolves({
			status: 'SUCCESSFUL',
			data: salesMock[0]
		})
		await salesController.getSalesById(req, res)
		expect(res.status).to.have.been.calledWith(200)
		expect(res.json).to.have.been.calledWith(salesMock[0])

	})

	it('Get sales by id that doesnt exist', async function() {
		const req = { params: { id: 6 } }
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		sinon.stub(salesService, 'findSalesById').resolves({
			status: 'NOT_FOUND',
			data: { message: 'Sale not found' }
		})
		await salesController.getSalesById(req, res)
		expect(res.status).to.have.been.calledWith(404)
	})

	afterEach(sinon.restore)
})