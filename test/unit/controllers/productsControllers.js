const { expect } = require("chai");
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsServices = require('../../../services/productsService');

describe('0- Testa controller de producs', () => {
  const req = {};
  const res = {};
  describe('1- Verifica a função selectAll', () => {
    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])
      sinon.stub(productsServices, 'getAllProducts').resolves([])
    })

    after(() => {
      productsServices.getAllProducts.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await productsController.selectAll(req, res)

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await productsController.selectAll(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('2- Verifica a função selectbyId', () => {
    before(() => {
      const product = {
        id: 1,
        name: "produto A",
        quantity: 10
      }
      req.params = sinon.stub().returns(1)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsServices, 'getById').resolves(product)
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await productsController.selectbyId(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await productsController.selectbyId(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('3- Verifica a função selectbyId', () => {
    before(() => {
      req.params = sinon.stub().returns(1)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsServices, 'getById').resolves(null)
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('1- Verifica se é chamada mensagem "Product not found"', async () => {
      await productsController.selectbyId(req, res)

      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await productsController.selectbyId(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
  describe('4- Verifica criação de produto pela createProduct', () => {
    before(() => {
      const product = {
        id: 1,
        name: "produto A",
        quantity: 100
      }
      req.body = { name: "produto A", quantity: 100 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsServices, 'getAllProducts').resolves([{}])
      sinon.stub(productsServices, 'productsCreate').resolves(product)
    })

    after(() => {
      productsServices.getAllProducts.restore()
      productsServices.productsCreate.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await productsController.createProduct(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 201', async () => {
      await productsController.createProduct(req, res)

      expect(res.status.calledWith(201)).to.be.equal(true)
    })
  })
  describe('5- Verifica falha criação de produto por produto já existente', () => {
    before(() => {
      const products = [{
        id: 1,
        name: "produto A",
        quantity: 100
      },
      {
        id: 2,
        name: "produto B",
        quantity: 200
      }]
      req.body = { name: "produto A", quantity: 100 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsServices, 'getAllProducts').resolves(products)
    })
    after(() => {
      productsServices.getAllProducts.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await productsController.createProduct(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 409', async () => {
      await productsController.createProduct(req, res)

      expect(res.status.calledWith(409)).to.be.equal(true)
    })
  })
  describe('6- Verifica função editProduct', () => {
    before(() => {
      const product1 = {
        id: 1,
        name: "produto A",
        quantity: 100 
      }      
      const product2 ={
        id: 2,
        name: "produto B",
        quantity: 200
      }
      req.params = sinon.stub().returns(1)
      req.body = { name: "produto A", quantity: 100 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsServices, 'getById').resolves(product1)
      sinon.stub(productsServices, 'productToEdit').resolves(product2)
    })
    after(() => {
      productsServices.getById.restore()
      productsServices.productToEdit.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await productsController.editProduct(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await productsController.editProduct(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('7- Verifica quando o produto não é editado porque já existe outro com o mesmo nome', () => {
    before(() => {
      req.params = sinon.stub().returns(1)
      req.body = { name: "produto A", quantity: 100 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves(undefined)
    })
    after(() => {
      productsServices.getById.restore()
    })

    it('1- Verifica se é chamada resposta a mensagem "Product not found"', async () => {
      await productsController.editProduct(req, res)

      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await productsController.editProduct(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
  describe('8- Verifica quando produto é deletado na função deleteProduct', () => {
    before(() => {
      const product1 = {
        id: 1,
        name: "produto A",
        quantity: 100 
      }     
      req.params = sinon.stub().returns(1)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves(product1)
      sinon.stub(productsServices, 'deletingProduct').resolves(product1)
    })
    after(() => {
      productsServices.getById.restore()
      productsServices.deletingProduct.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await productsController.deleteProduct(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 204', async () => {
      await productsController.deleteProduct(req, res)

      expect(res.status.calledWith(204)).to.be.equal(true)
    })
  })
  describe('9- Verifica quando produto não é encontrado na função deleteProduct', () => {
    before(() => {
      req.params = sinon.stub().returns(1)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves([])
      sinon.stub(productsServices, 'deletingProduct').resolves(null)
    })
    after(() => {
      productsServices.getById.restore()
      productsServices.deletingProduct.restore()
    })

    it('1- Verifica se é chamada a mensagem "Product not found"', async () => {
      await productsController.deleteProduct(req, res)

      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await productsController.deleteProduct(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
});
