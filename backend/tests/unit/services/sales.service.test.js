const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/sales.model')
const salesService = require('../../../src/services/sales.service')
const salesMock = require('../mocks/sales.mock')

const { expect } = chai;
chai.use(sinonChai);

describe('Sales Service', function () {
	it('Get all sales', async function() {
		sinon.stub(salesModel, 'findAll').resolves(salesMock)
		const response = await salesService.findAllSales()
		expect(response).to.be.deep.equal({
			status: 'SUCCESSFUL', 
			data: salesMock
		})

	})
	it('Get sales by id that exists', async function() {
		sinon.stub(salesModel, 'findById').resolves(salesMock[0])
		const response = await salesService.findSalesById(1)
		expect(response).to.be.deep.equal({
			status: 'SUCCESSFUL',
			data: salesMock[0]
		})
	})

	it('Get sales by id that doesnt exist', async function() {
		sinon.stub(salesModel, 'findById').resolves([])
		const response = await salesService.findSalesById(4)
		expect(response).to.be.deep.equal({
			status: 'NOT_FOUND',
			data: { message: 'Sale not found' }
		})
	})

	afterEach(sinon.restore)
})