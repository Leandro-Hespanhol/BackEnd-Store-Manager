const { expect } = require("chai");
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsServices = require('../../../services/productsService');

describe('0- Testa controller de producs', () => {
  describe('1- Verifica a função selectAll', () => {
    let req = {};
    let res = {};
    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns([])
      sinon.stub(productsServices, 'getAllProducts').resolves([])
    })

    after(() => {
      productsServices.getAllProducts.restore()
    })

    it('É chamada resposta com um array', async () => {
      await productsController.selectAll(req, res)

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('É chamado status 200', async () => {
      await productsController.selectAll(req, res)
      console.log('LINHA21', res.status.calledWith(200));

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
});
