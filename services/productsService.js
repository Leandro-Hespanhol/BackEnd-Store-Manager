const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();

  return allProducts;
};

const getById = async (id) => {
  const [idFound] = await productsModel.findById(id);
  if (!idFound) return null;

  return idFound[0];
};

const productToEdit = async (id, name, quantity) => {
 const editing = await productsModel.productEdition(id, name, quantity);
 return editing.affectedRows;
};

const productsCreate = async (name, quantity) => {
  const newProduct = await productsModel.insertProduct({
    name,
    quantity,
  });

  return newProduct;
};

const deletingProduct = async (id) => {
  const product = await productsModel.productDeletion(id);
  return product;
};

module.exports = { 
  productsCreate,
  getAllProducts,
  getById,
  productToEdit,
  deletingProduct };