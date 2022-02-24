const { expect } = require("chai");
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');
 
describe('Verifica model de products', () => {
  describe('Restaura condições iniciais e verifica produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }]])
    })
    after(() => {
      connection.execute.restore();
    })
  })
})