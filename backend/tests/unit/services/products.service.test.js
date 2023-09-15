const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/products.model')
const productsService = require('../../../src/services/products.service')
const productsMock = require('../mocks/products.mock')

const { expect } = chai;
chai.use(sinonChai);

describe('Products Service', function () {
	it('Get all products', async function() {
		sinon.stub(productsModel, 'findAll').resolves(productsMock)
		const response = await productsService.findAllProducts()
		expect(response).to.be.deep.equal({
			status: 'SUCCESSFUL', 
			data: productsMock
		})

	})
	it('Get products by id that exists', async function() {
		sinon.stub(productsModel, 'findById').resolves(productsMock[0])
		const response = await productsService.findProductsById(1)
		expect(response).to.be.deep.equal({
			status: 'SUCCESSFUL',
			data: productsMock[0]
		})
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