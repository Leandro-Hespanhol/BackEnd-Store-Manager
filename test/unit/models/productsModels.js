const { expect } = require("chai");
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');
 
describe('Verifica model de products', () => {
  describe('Restaura condições iniciais e verifica produtos', () => {
    const template = [[{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    }]]
    before(() => {
      sinon.stub(connection, 'execute').resolves(template)
    })
    after(() => {
      connection.execute.restore();
    })
    it('Verifica se função getAll entrega um array', async () => {
      const getAll = await productModel.getAll()
      
      expect(getAll).to.be.an('array')
    })
    it('Verifica se o objeto possui as chaves id, name, quantity', async () => {
      const [getAll] = await productModel.getAll()
      expect(getAll).to.have.a.property('id')
      expect(getAll).to.have.a.property('name')
      expect(getAll).to.have.a.property('quantity')
      
    })
  })
})