const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const productsMock = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Products Controller', function () {
it('Get all products', async function () {
const req = {};
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(productsService, 'findAllProducts').resolves({
status: 'SUCCESSFUL',
data: productsMock,
});
await productsController.getAllProducts(req, res);
expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith(productsMock);
});
it('Get products by id that exists', async function () {
const req = { params: { id: 1 } };
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(productsService, 'findProductsById').resolves({
status: 'SUCCESSFUL',
data: productsMock[0],
});
await productsController.getProductsById(req, res);
expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith(productsMock[0]);
});

it('Get products by id that doesnt exist', async function () {
const req = { params: { id: 6 } };
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(productsService, 'findProductsById').resolves({
status: 'NOT_FOUND',
data: { message: 'Product not found' },
});
await productsController.getProductsById(req, res);
expect(res.status).to.have.been.calledWith(404);
});

it('Register new products', async function () {
const req = { body: { name: 'produtox' } };
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(productsService, 'registerProducts').resolves({
status: 'SUCCESSFUL',
data: { 
id: 1,
name: 'produtox',
},
});
await productsController.registerNewProducts(req, res);
expect(res.status).to.have.been.calledWith(201);
});

it('Updates products', async function () {
const req = { 
params: { id: 1 },
body: { name: 'produtox' }, 
};
const res = {};
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(productsService, 'updateProducts').resolves({
status: 'SUCCESSFUL',
data: { 
id: 1,
name: 'produtox',
},
});
await productsController.updateProducts(req, res);
expect(res.status).to.have.been.calledWith(200);
});

afterEach(sinon.restore);
});