const { expect } = require("chai");
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModel');
 
describe('0- Verifica model de products', () => {
  describe('1- Verifica retornos positivos em produtos', () => {
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
    it('1- Verifica se função getAll entrega um array', async () => {
      const getAll = await productModel.getAll()
      
      expect(getAll).to.be.an('array')
    })
    it('2- Verifica se o objeto possui as chaves id, name, quantity', async () => {
      const [getAll] = await productModel.getAll()
      expect(getAll).to.have.a.property('id')
      expect(getAll).to.have.a.property('name')
      expect(getAll).to.have.a.property('quantity')
    })
    it('3- Verifica se a função insert entrega um objeto com propriedades do produto', async () => {
      const insert = await productModel.insertProduct(template)
      expect(insert).to.be.an('object')
      expect(insert).to.have.a.property('id')
      expect(insert).to.have.a.property('name')
      expect(insert).to.have.a.property('quantity')
    })
    it('4- Verifica se a função find entrega array procurado por id', async () => {
      const findProduct = await productModel.findById(template)
      expect(findProduct[0][0]).to.be.an('object')
      expect(findProduct[0][0]).to.have.a.property('id')
      expect(findProduct[0][0].id).to.be.equal(1)
      expect(findProduct[0][0]).to.have.a.property('name')
      expect(findProduct[0][0].name).to.be.equal('Martelo de Thor')
      expect(findProduct[0][0]).to.have.a.property('quantity')
      expect(findProduct[0][0].quantity).to.be.equal(10)
    })
  })
  describe('2- Verifica alterações nos produtos dos banco de dados', () => {
    const payLoadEdition = [[{
      id: 1,
      name: "Cadeira Gamer",
      quantity: "150"
    }]]
    before(() => {
      sinon.stub(connection, 'execute').resolves([[{ id: 1, name: "Placa de vídeo", quantity: 13 }]])
    })
    after(() => {
      connection.execute.restore();
    })
    it('1- Verifica se a função edition altera o produto procurado por id', async () => {

      expect(payLoadEdition[0][0].name).to.be.equal('Cadeira Gamer')

      const edition = await productModel.productEdition()
      expect(edition[0][0]).to.be.an('object')
      expect(edition[0][0].name).not.to.be.equal('Cadeira Gamer')
    })
  })
  describe('3- Verifica Edições retornando vazio', () => {
    const payLoadEdition = [[{
      id: 1,
      name: "Cadeira Gamer",
      quantity: "150"
    }]]
    before (() => {
      sinon.stub(connection, 'execute').resolves([])
    })
    after(() => {
      connection.execute.restore();
    })
    it('1- Verifica se a edição por id inexistente retorna null', async () => {
      expect(payLoadEdition[0][0].name).to.be.equal('Cadeira Gamer')
      const edition = await productModel.productEdition()

      expect(edition).to.be.null;
    })
  })

  describe('4- Verifica findById com retornos positivos', () => {
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
    it('1- Verifica o produto é encontrado', async () => {
      const idFound = await productModel.findById()
      expect(idFound[0][0]).to.be.a('object')
    })
  })

  describe('5- Verifica findById com retornos negativos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([])
    })
    after(() => {
      connection.execute.restore();
    })
    it('1- Verifica o produto não é encontrado', async () => {
      const idNotFound = await productModel.findById()
      expect(idNotFound).to.be.null
    })
  })
  
  describe('6- Verifica deleções bem sucedidas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    })
    after(() => {
      connection.execute.restore();
    })
    it('1- Verifica se a função de deletar exclui o produto', async () => {
  
      const deletion = await productModel.productDeletion();
      expect(deletion[0]).to.have.a.property('affectedRows')
      expect(deletion[0].affectedRows).to.be.equal(1)
    })
  })

  describe('7- Verifica valor nulo na função de deleção', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]])
    })
    after(() => {
      connection.execute.restore();
    })
    it('1- Verifica valor nulo na função de deleção', async () => {
  
      const deletion = await productModel.productDeletion();
      expect(deletion).to.be.equal(null)

    })
  })
})