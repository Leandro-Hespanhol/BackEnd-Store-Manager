const { expect } = require("chai");
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('0- Testando a camada de services', async () => {
  describe('1- Verifica retorno positivo do serviço getAll', async () => {
    before(() => {
      const templateProducts = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ]
      sinon.stub(productsModel, 'getAll').resolves(templateProducts)
    });
  
    after(() => {
      productsModel.getAll.restore()
    });

    it('1- Verifica se é retornado um array', async () => {
    const allProducts = await productsService.getAllProducts()
    expect(allProducts).to.be.an('array')
    });

    it('2- Verifica se as propriedades id, name, quantity estão presentes', async () => {
    const allProducts = await productsService.getAllProducts()
    expect(allProducts[0]).to.have.all.keys('id', 'name', 'quantity')
    });
  })

  describe('2- Verifica retorno positivo do serviço getById', async () => {
    before(() => {
      const templateProducts = [[
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        }]]
      sinon.stub(productsModel, 'findById').resolves(templateProducts)
    });
  
    after(() => {
      productsModel.findById.restore()
    });

    it('1- Verifica se é retornado um objeto', async () => {
    const foundProduct = await productsService.getById()
    expect(foundProduct).to.be.an('object')
    });
  })

  describe('3- Verifica retorno nulo do serviço getById', () => {
    before(() => {
       sinon.stub(productsModel, 'findById').resolves([[null]])
    });
  
    after(() => {
      productsModel.findById.restore()
    });
    it('1- Verifica retorno undefined', async () => {
      const notFoundProduct = await productsService.getById()
      expect(notFoundProduct).to.be.null;
      });
  })
  
  describe('4- Verifica retorno da função productsCreate', () => {
    before(() => {
      const affectedRows = { affectedRows: 1 }
      sinon.stub(productsModel, 'productEdition').resolves(affectedRows)
    })
    after(() => {
      productsModel.productEdition.restore();
    })
    it('1- Verifica confirmação de edição por affectedRows', async () => {
      const edition = await productsService.productToEdit()
      expect(edition).to.be.equal(1);
    });
  })

  describe('5- Verifica retorno da função productsCreate', () => {
    before(() => {
      const produto = {
        name: 'Computador',
        quantity: 159
      }
      sinon.stub(productsModel, 'insertProduct').resolves(produto)
    })
    after(() => {
      productsModel.insertProduct.restore();
    })
    it('1- Verifica produto criado', async () => {
      const newProduct = await productsService.productsCreate();
      expect(newProduct).to.be.an('object');
      expect(newProduct).to.have.all.keys('name', 'quantity');
    });
  })
  
  describe('6- Verifica retorno nullo da função deletingProduct', () => {
    before(() => {
      sinon.stub(productsModel, 'productDeletion').resolves(null)
    })
    after(() => {
      productsModel.productDeletion.restore();
    })
    it('1- Verifica produto criado', async () => {
      const deletedProduct = await productsService.deletingProduct();
      expect(deletedProduct).to.be.null;
    });
  })
});