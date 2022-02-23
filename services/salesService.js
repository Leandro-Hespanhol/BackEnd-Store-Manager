const { saleRegistered, productSaleRegistered, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (req) => {
  const newSaleId = await saleRegistered();

  // console.log('SERVICE', newSaleId, req.productId, req.quantity);

  await productSaleRegistered(newSaleId, req.productId, req.quantity);

  const result = {
    productId: Number(req.productId),
    quantity: req.quantity,
  };

  // console.log('result', result);

  return ({
    id: newSaleId,
    itemsSold: [
      result,  
    ],
  });
};

module.exports = {
  // allSales,
  saleRegisterResponse,
};