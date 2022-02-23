const { saleRegistered, productSaleRegistered, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (productId, quantity) => {
  const newSaleId = await saleRegistered();

  await productSaleRegistered(newSaleId, productId, quantity);

  const result = {
    productId: Number(productId),
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
  // allSales,
  saleRegisterResponse,
};