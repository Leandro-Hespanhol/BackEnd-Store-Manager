const { insertProduct, getAll, findById, productEdition,
  productDeletion } = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await getAll();

  return allProducts;
};

const getById = async (id) => {
  const [idFound] = await findById(id);
  if (!idFound) return null;

  return idFound[0];
};

const productToEdit = async (id, name, quantity) => {
 const [editing] = await productEdition(id, name, quantity);
 return editing.affectedRows;
};

const productsCreate = async (name, quantity) => {
  const newProduct = await insertProduct({
    name,
    quantity,
  });

  return newProduct;
};

const deletingProduct = async (id) => {
  const product = await productDeletion(id);
  return product;
};

module.exports = { 
  productsCreate,
  getAllProducts,
  getById,
  productToEdit,
  deletingProduct };