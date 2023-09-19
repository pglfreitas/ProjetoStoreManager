const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsValidations = require('../../../src/middlewares/productsValidations')

const { expect } = chai;
chai.use(sinonChai);

describe('Products Validations', function () {
	it('name exists validation', async function() {
		const req = { body: { name: ''}}
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		const next = sinon.stub()
		productsValidations(req, res, next)
		expect(res.status).to.have.been.calledWith(400)
		expect(res.json).to.have.been.calledWith({
			message: "\"name\" is required"
		})
	}) 
	it('name lenght validation', async function() {
		const req = { body: { name: 'abc'}}
		const res = {}
		res.status = sinon.stub().returns(res)
		res.json = sinon.stub().returns()
		const next = sinon.stub()
		productsValidations(req, res, next)
		expect(res.status).to.have.been.calledWith(422)
		expect(res.json).to.have.been.calledWith({
			message: "\"name\" length must be at least 5 characters long"
		})
	}) 
	afterEach(sinon.restore)
})