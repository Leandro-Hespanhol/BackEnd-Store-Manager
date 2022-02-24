const { saleRegistered, productSaleRegistered, updateSale, getAllSales, findSaleById, 
   } = require('../models/salesModel');

const saleRegisterResponse = async (requisition) => {
  const newSaleId = await saleRegistered();

  requisition.forEach((sales) => productSaleRegistered(newSaleId, sales.productId, sales.quantity));
  
  const salesObj = requisition.map((productsSales) => ({
      productId: Number(productsSales.productId),
      quantity: productsSales.quantity,
  }));

  return ({
    id: newSaleId,
    itemsSold: [
      ...salesObj,  
    ],
  });
};

const searchSaleById = async (id) => {
  const [saleFound] = await findSaleById(id);

  if (!saleFound) return null;

  return saleFound;
};

const saleEdition = async (id, requisition) => {
  const newSale = await updateSale(id, ...requisition);
  console.log('newSale', newSale);
  return ({
    saleId: id,
    itemUpdated: [
      ...requisition,  
    ],
  });
};

const getEverySales = async () => {
  const sales = await getAllSales();
  return sales;
};

module.exports = {
  saleRegisterResponse,
  searchSaleById,
  saleEdition,
  getEverySales,
};