const { saleRegistered, productSaleRegistered, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (requisition) => {
  const newSaleId = await saleRegistered();

  // console.log('SERVICE', requisition);

  requisition.forEach((sales) => productSaleRegistered(newSaleId, sales.productId, sales.quantity));
  
  const salesObj = requisition.map((productsSales) => ({
      productId: Number(productsSales.productId),
      quantity: productsSales.quantity,
      // teste: console.log('OBJETO', productsSales),
  }));

  // console.log('result', salesObj);

  return ({
    id: newSaleId,
    itemsSold: [
      ...salesObj,  
    ],
  });
};

const saleEdition = async (id, requisition) => {
  console.log('salesIDFOUND', id);
  console.log('salesREQUISITION', requisition);
};

module.exports = {
  // allSales,
  saleRegisterResponse,
  saleEdition,
};