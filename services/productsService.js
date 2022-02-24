const { insertProduct, getAll, findById, productEdition,
  productDeletion } = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await getAll();

  return allProducts;
};

const getById = async (id) => {
  const [idFound] = await findById(id);
  // console.log(idFound[0]);
  if (!idFound) return null;

  return idFound[0];
};

const productToEdit = async (id, name, quantity) => {
 const [editing] = await productEdition(id, name, quantity);
 console.log('editing', editing.affectedRows);
 return editing.affectedRows;
};

const productsCreate = async (name, quantity) => {
  // console.log('service', name, quantity);
  const newProduct = await insertProduct({
    name,
    quantity,
  });
    // console.log('newproduct', newProduct);

  return newProduct;
};

const deletingProduct = async (id) => {
  const product = await productDeletion(id);
  if (!product) return null;
  return product;
};

module.exports = { 
  productsCreate,
  getAllProducts,
  getById,
  productToEdit,
  deletingProduct };