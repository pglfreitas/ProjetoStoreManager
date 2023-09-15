const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/products.model')
const productsService = require('../../../src/services/products.service')
const productsController = require('../../../src/controllers/products.controller')
const productsMock = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Products Controller', function () {
	it('Get all products', async function() {
		const req = {}
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		sinon.stub(productsService, 'findAllProducts').resolves({
			status: 'SUCCESSFUL',
			data: productsMock
		})
		await productsController.getAllProducts(req, res)
		expect(res.status).to.have.been.calledWith(200)
		expect(res.json).to.have.been.calledWith(productsMock)

	})
	it('Get products by id that exists', async function() {
		const req = { params: { id: 1 } }
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		sinon.stub(productsService, 'findProductsById').resolves({
			status: 'SUCCESSFUL',
			data: productsMock[0]
		})
		await productsController.getProductsById(req, res)
		expect(res.status).to.have.been.calledWith(200)
		expect(res.json).to.have.been.calledWith(productsMock[0])

	})

	it('Get products by id that doesnt exist', async function() {
		sinon.stub(productsModel, 'findById').resolves(null)
		const response = await productsService.findProductsById(4)
		expect(response).to.be.deep.equal({
			status: 'NOT_FOUND',
			data: { message: 'Product not found' }
		})
	})

	afterEach(sinon.restore)
})