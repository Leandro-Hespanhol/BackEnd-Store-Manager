const { expect } = require("chai");
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const productsService = require('../../../services/productsService');

describe('0- Testa controller de sales', () => {
  const req = {};
  const res = {};
  describe('1- Verifica a função getSales', () => {
    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])
      sinon.stub(salesService, 'getEverySales').resolves([])
    })

    after(() => {
      salesService.getEverySales.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await salesController.getSales(req, res)

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await salesController.getSales(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('2- Verifica a função registerSale', () => {
    before(() => {
      const sales = { id: 1, itemsSold: [] };
      const products = [{ id: 1, name: "Alfinete", quantity: 200 }, { id: 2, name: "Agulha", quantity: 5000 }];
      req.body = [{ id: 1, quantity: 2 }]
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])
      sinon.stub(productsService, 'getAllProducts').resolves([products])
      sinon.stub(salesService, 'saleRegisterResponse').resolves(sales)
    })

    after(() => {
      productsService.getAllProducts.restore()
      salesService.saleRegisterResponse.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await salesController.registerSale(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 201', async () => {
      await salesController.registerSale(req, res)

      expect(res.status.calledWith(201)).to.be.equal(true)
    })
  })
  describe('3- Verifica a negativa da função registerSale por falta de estoque', () => {
    before(() => {
      const products = [{ id: 1, name: "Alfinete", quantity: 5 }];

      req.body = [{ productId: 1, quantity: 500 }]
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Such amount is not permitted to sell' })

      sinon.stub(productsService, 'getAllProducts').resolves(products)
      sinon.stub(salesService, 'saleRegisterResponse').resolves([])
    })

    after(() => {
      productsService.getAllProducts.restore()
      salesService.saleRegisterResponse.restore()
    })

    it('1- Verifica se é chamada resposta "Such amount is not permitted to sell"', async () => {
      await salesController.registerSale(req, res)

      expect(res.json.calledWith({ message: 'Such amount is not permitted to sell' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 422', async () => {
      await salesController.registerSale(req, res)

      expect(res.status.calledWith(422)).to.be.equal(true)
    })
  })
  describe('4- Verifica a função showSalesById', () => {
    before(() => {
      const sale = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];

      req.params = { id: 1 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])

      sinon.stub(salesService, 'searchSaleById').resolves(sale)
    })

    after(() => {
      salesService.searchSaleById.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await salesController.showSalesById(req, res)

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await salesController.showSalesById(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('5- Verifica quando a função showSalesById não encontra a venda', () => {
    before(() => {
      const sale = [];

      req.params = { id: 1 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Sale not found' })

      sinon.stub(salesService, 'searchSaleById').resolves(sale)
    })

    after(() => {
      salesService.searchSaleById.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await salesController.showSalesById(req, res)

      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await salesController.showSalesById(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
  describe('6- Verifica a função editSale', () => {
    before(() => {
      const sale = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 6
          }
        ]
      };

      req.params = { id: 1 }
      req.body =   [
        {
          productId: 1,
          quantity: 6
        }
      ]
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])

      sinon.stub(salesService, 'searchSaleById').resolves(1)
      sinon.stub(salesService, 'saleEdition').resolves(sale)
    })

    after(() => {
      salesService.searchSaleById.restore()
      salesService.saleEdition.restore()
    })

    it('1- Verifica se é chamada resposta com um objeto', async () => {
      await salesController.editSale(req, res)

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 200', async () => {
      await salesController.editSale(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
  describe('7- Verifica quando a função editSale não encontra a venda', () => {
    before(() => {
      req.params = { id: 1 }
      req.body = { id: 1 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Sale not found' })

      sinon.stub(salesService, 'searchSaleById').resolves(null)
      sinon.stub(salesService, 'saleEdition').resolves([])
    })

    after(() => {
      salesService.searchSaleById.restore()
      salesService.saleEdition.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await salesController.editSale(req, res)

      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await salesController.editSale(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
  describe('8- Verifica quando a função deleteSale exclui uma venda', () => {
    before(() => {
      req.params = { id: 1 }
      req.body = { id: 1 }
      res.status = sinon.stub().returns(res)
      res.end = sinon.stub().returns()
      res.json = sinon.stub().returns({ message: 'Sale not found' })

      sinon.stub(salesService, 'saleDeletion').resolves(1)
    })

    after(() => {
      salesService.saleDeletion.restore()
    })

    it('1- Verifica se é chamado res.end', async () => {
      await salesController.deleteSale(req, res)

      expect(res.end.calledWith()).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 204', async () => {
      await salesController.deleteSale(req, res)

      expect(res.status.calledWith(204)).to.be.equal(true)
    })
  })
  describe('9- Verifica quando a função deleteSale não encontra a venda', () => {
    before(() => {
      req.params = { id: 1 }
      req.body = { id: 1 }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns({ message: 'Sale not found' })

      sinon.stub(salesService, 'saleDeletion').resolves()
    })

    after(() => {
      salesService.saleDeletion.restore()
    })

    it('1- Verifica se é chamada resposta com um array', async () => {
      await salesController.deleteSale(req, res)

      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true)
    })

    it('2- Verifica se é chamado status 404', async () => {
      await salesController.deleteSale(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })
  })
})