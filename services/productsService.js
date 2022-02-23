const { insertProduct } = require('../models/productsModel');

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

module.exports = { productsCreate };