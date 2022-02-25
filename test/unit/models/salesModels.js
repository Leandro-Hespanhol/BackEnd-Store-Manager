const { expect } = require("chai");
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('0- Verifica models de sales', () => {
  const template =   [[
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 789
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 666
    }
  ]]
  describe('1- Verifica retornos positivos em sales', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves(template)
    })
    after(() => {
      connection.execute.restore();
    })

    it('1- Verifica se função getAll entrega um array', async () => {
      const getAll = await salesModel.getAllSales()
      
      expect(getAll).to.be.an('array')
    })
    it('2- Verifica se o objeto possui as chaves saleId, date, productId, quantity', async () => {
      const [getAll] = await salesModel.getAllSales()
      expect(getAll).to.have.all.keys('saleId' , 'date', 'productId', 'quantity')
    })

  })
  describe('2- Verifica registros de vendas na tabela sales', () => {
    const insertId = [{ insertId: 1}]

    before(() => {
      sinon.stub(connection, 'execute').resolves(insertId)
    })
    after(() => {
      connection.execute.restore();
    })

    it('1- Verifica se a função registrar vendas entrega um id igual a 1', async () => {
      const register = await salesModel.saleRegistered()
      expect(register).to.be.a('number')
      expect(register).to.be.equal(1)
    })
  })

  describe('3- Verifica registros de vendas na tabela sales_products', async () => { 
    const affectedRows = [{ affectedRows: 1}]

    before(() => {
      sinon.stub(connection, 'execute').resolves(affectedRows)
    })
    after(() => {
      connection.execute.restore();
    })

    it('Verifica se a função productSaleRegistered insere valores na tabela', async () => {
      const productSales = await salesModel.productSaleRegistered()
      expect(productSales.affectedRows).not.to.be.equal(0)
    })
   })

  describe('4- Verifica função find sales', async () => {
    
    before(() => {
      sinon.stub(connection, 'execute').resolves(template)
    })
    after(() => {
      connection.execute.restore();
    })
    
    it('1- Verifica propriedades do objeto entregue pela função findSaleById', async () => {
      const findProduct = await salesModel.findSaleById(template)
  
      expect(findProduct[0][0]).to.be.an('object')
      expect(findProduct[0][0]).to.have.a.property('saleId')
      expect(findProduct[0][0]).to.have.a.property('date')
      expect(findProduct[0][0]).to.have.a.property('productId')
      expect(findProduct[0][0]).to.have.a.property('quantity')
      
      expect(findProduct[0][1]).to.be.an('object')
      expect(findProduct[0][1]).to.have.a.property('saleId')
      expect(findProduct[0][1]).to.have.a.property('date')
      expect(findProduct[0][1]).to.have.a.property('productId')
      expect(findProduct[0][1]).to.have.a.property('quantity')
      
    })
    it('2- Verifica valores das chaves da função findSaleById', async () => {
      const findProduct = await salesModel.findSaleById(template)

      expect(findProduct[0][0].saleId).to.be.equal(1)
      expect(findProduct[0][0].date).to.be.equal('2021-09-09T04:54:29.000Z')
      expect(findProduct[0][0].productId).to.be.equal(1)
      expect(findProduct[0][0].quantity).to.be.equal(789)
      expect(findProduct[0][1].saleId).to.be.equal(1)
      expect(findProduct[0][1].date).to.be.equal('2021-09-09T04:54:54.000Z')
      expect(findProduct[0][1].productId).to.be.equal(2)
      expect(findProduct[0][1].quantity).to.be.equal(666)
    })
  })

  describe('5- Verifica find com retorno nulo', async () => { 
    before(() => {
      sinon.stub(connection, 'execute').resolves([])
    })
    after(() => {
      connection.execute.restore();
    })
    it('', async () => {
      const findProduct = await salesModel.findSaleById(template)
      expect(findProduct).to.be.null
    })
  })

  describe('6- Verifica função de updateSales', async () => {
    const affectedRows = [{ affectedRows: 1}]

    before(() => {
      sinon.stub(connection, 'execute').resolves(affectedRows)
    })
    after(() => {
      connection.execute.restore();
    })

    it('Verifica se a função updateSale atualiza valores na tabela', async () => {
      const productSales = await salesModel.updateSale()
      
      expect(productSales[0]).to.have.a.property('affectedRows')
      expect(productSales[0].affectedRows).not.to.be.equal(0)
    })
  })
})