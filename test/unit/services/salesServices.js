const { expect } = require("chai");
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('0- Testando a camada de SalesServices', async () => {
  describe('1- Verifica retorno positivo do serviço getEverySales', async () => {
    before(() => {
      const templateSales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      sinon.stub(salesModel, 'getAllSales').resolves(templateSales)
    });
    
    after(() => {
      salesModel.getAllSales.restore()
    });
    
    it('1- Verifica se é retornado um array de tamanho 2', async () => {
      const allSales = await salesService.getEverySales()
      expect(allSales).to.be.an('array')
      expect(allSales.length).to.be.equal(2)
    });
    
    it('2- Verifica se as propriedades id, name, quantity estão presentes', async () => {
      const allSales = await salesService.getEverySales()
      expect(allSales[0]).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    });
  })
  describe('2- Verifica retorno positivo do serviço saleRegisterResponse', async () => {
    before(() => {
      const templateProductSales = [[1, 1, 5], [1, 2, 8]]

      sinon.stub(salesModel, 'saleRegistered').resolves(1)
      sinon.stub(salesModel, 'productSaleRegistered').resolves(templateProductSales)
    });
    
    after(() => {
      salesModel.saleRegistered.restore()
    });
    
    it('1- Verifica se é retornado um objeto com chaves id e itemssold', async () => {
      const templateSales = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      const salesResponse = await salesService.saleRegisterResponse(templateSales)
      expect(salesResponse).to.be.an('Object')
      expect(salesResponse).to.have.a.property('id')
      expect(salesResponse).to.have.a.property('itemsSold')
    });
  })
  describe('3- Verifica função searchSaleById', () => {
    before(() => {
      const templateLooked = [
        { date: '2022-02-25T18:10:13.000Z', productId: 1, quantity: 9 },
        { date: '2022-02-25T18:10:13.000Z', productId: 2, quantity: 19 }
      ]

      sinon.stub(salesModel, 'findSaleById').resolves(templateLooked)
    });
    
    after(() => {
      salesModel.findSaleById.restore()
    });

    it('1- Verifica se as propriedades id, name, quantity estão presentes', async () => {
      const saleFound = await salesService.searchSaleById()
      expect(saleFound).to.be.an('object')
    });
  })

  describe('4- Verifica função searchSaleById', () => {
    before(() => {

      sinon.stub(salesModel, 'findSaleById').resolves([null])
    });
    
    after(() => {
      salesModel.findSaleById.restore()
    });

    it('1- Verifica se as propriedades id, name, quantity estão presentes', async () => {
      const saleFound = await salesService.searchSaleById()
      expect(saleFound).to.be.null
    });
  })
  
  describe('5- Verifica função saleEdition', () => {
    before(() => {
      const templateLooked = {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }

      sinon.stub(salesModel, 'updateSale').resolves()
    });
    
    after(() => {
      salesModel.updateSale.restore()
    });
    const id = 1
    const requisition = [
      {
        "productId": 1,
        "quantity": 6
      }
    ]
    it('1- Verifica se as propriedades id, name, quantity estão presentes', async () => {
      const saleFound = await salesService.saleEdition(id, requisition)
      expect(saleFound).to.be.an('object')
    });
  })
})

