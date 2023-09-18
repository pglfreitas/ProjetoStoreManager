const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection')
const productsModel = require('../../../src/models/products.model')
const productsMock = require('../mocks/products.mock')

const { expect } = chai;
chai.use(sinonChai);

describe('Products Model', function () {
	it('Get all products', async function() {
		sinon.stub(connection, 'execute').resolves([productsMock])
		const response = await productsModel.findAll()
		expect(response).to.be.equal(productsMock)

	})

	it('Get products by id', async function() {
		sinon.stub(connection, 'execute').resolves([productsMock])
		const response = await productsModel.findById(1)
		expect(response).to.be.equal(productsMock[0])
	})

	it('Register new products', async function() {
		sinon.stub(connection, 'execute').resolves([{
			insertId: 4,
		}])
		const response = await productsModel.insert('produtox')
		expect(response).to.be.equal(4)
	})
	afterEach(sinon.restore)
})