const { saleRegistered, productSaleRegistered, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (productId, quantity) => {
  const newSaleId = await saleRegistered();

  await productSaleRegistered(newSaleId, productId, quantity);

  // const lintSnakeCase = 'product_id';

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

// const allSales = async () => {
//   const allProductSales = await getAllSales();

//   console.log(allProductSales);
//   const sales = await allProductSales({
//     idSale,
//     date, 
//     quantity,
//   });
  
//   return allProductSales;
// };

module.exports = {
  // allSales,
  saleRegisterResponse,
};