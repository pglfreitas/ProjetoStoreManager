const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection')
const salesModel = require('../../../src/models/sales.model')
const salesMock = require('../mocks/sales.mock')

const { expect } = chai;
chai.use(sinonChai);

describe('Sales Model', function () {
	it('Get all sales', async function() {
		sinon.stub(connection, 'execute').resolves([salesMock])
		const response = await salesModel.findAll()
		expect(response).to.be.equal(salesMock)

	})
	it('Get sales by id', async function() {
		sinon.stub(connection, 'execute').resolves(salesMock)
		const response = await salesModel.findById(1)
		expect(response).to.be.equal(salesMock[0])
	})

	it('Register new sales', async function() {
		sinon.stub(connection, 'execute').resolves([{
			insertId: 3,
		}])
		const response = await salesModel.insert([{
			productId: 2,
			quantity: 5,
		}])
		expect(response).to.be.deep.equal({
			id:3,
			itemsSold: [{
				productId: 2,
				quantity: 5,
			}]
		})
	})

	afterEach(sinon.restore)
})