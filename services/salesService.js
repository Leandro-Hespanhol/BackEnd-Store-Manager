const { saleRegistered, productSaleRegistered } = require('../models/productsModel');

const saleRegisterResponse = async (productId, quantity) => {
  const newSaleId = await saleRegistered();

  await productSaleRegistered(newSaleId, productId, quantity);

  const lintSnakeCase = 'product_id';

  const result = {
    [lintSnakeCase]: Number(productId),
    quantity,
  };

  return ({
    id: newSaleId,
    itemSold: [
      result,  
    ],
  });
};

module.exports = {
  saleRegisterResponse,
};