const { saleRegistered, productSaleRegistered, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (req) => {
  const newSaleId = await saleRegistered();

  console.log('SERVICE', req);

  // const salesObj = {};

  req.forEach((sales) => productSaleRegistered(newSaleId, sales.productId, sales.quantity));
  
  const salesObj = req.map((productsSales) => ({
      // salesArray: {
      productId: Number(productsSales.productId),
      quantity: productsSales.quantity,
      // teste: console.log('OBJETO', productsSales),
    // },
  }));

  // console.log('result', result);

  return ({
    id: newSaleId,
    itemsSold: [
      ...salesObj,  
    ],
  });
};

module.exports = {
  // allSales,
  saleRegisterResponse,
};