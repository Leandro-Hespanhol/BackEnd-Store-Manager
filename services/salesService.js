const salesModel = require('../models/salesModel');

const saleRegisterResponse = async (requisition) => {
  // console.log('LINHA 4 salesService', requisition);

// const boolTest = salesModel.checkQuantity(requisition);

//   if (boolTest) return 'Insuficient quantity';
  
  const newSaleId = await salesModel.saleRegistered();
  
  requisition
  .forEach((sales) => salesModel.productSaleRegistered(newSaleId, sales.productId, sales.quantity));
  
  const salesObj = requisition.map((productsSales) => ({
      productId: Number(productsSales.productId), quantity: productsSales.quantity,
  }));

  return ({
    id: newSaleId,
    itemsSold: [
      ...salesObj,  
    ],
  });
};

const searchSaleById = async (id) => {
  const [saleFound] = await salesModel.findSaleById(id);

  if (!saleFound) return null;

  return saleFound;
};

const saleEdition = async (id, requisition) => {
  await salesModel.updateSale(id, requisition[0].productId, requisition[0].quantity);
  return ({
    saleId: id,
    itemUpdated: [
      ...requisition,  
    ],
  });
};

const getEverySales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const saleDeletion = async (id) => salesModel.deleteSale(id);

module.exports = {
  saleRegisterResponse,
  searchSaleById,
  saleEdition,
  getEverySales,
  saleDeletion,
};