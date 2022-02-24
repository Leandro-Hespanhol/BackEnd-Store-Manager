const { insertProduct, getAll, findById } = require('../models/productsModel');

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

const productsCreate = async (name, quantity) => {
  // console.log('service', name, quantity);
  const newProduct = await insertProduct({
    name,
    quantity,
  });
    // console.log('newproduct', newProduct);

  return newProduct;
};

// const productExits = async () => {
//   const existingProduct = await findProduct();
//   if (!existingProduct.length) return
// };

module.exports = { 
  productsCreate,
  getAllProducts,
  getById };