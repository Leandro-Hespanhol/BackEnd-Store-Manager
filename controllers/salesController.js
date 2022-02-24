const { getAllSales, findSaleById } = require('../models/salesModel');
const { saleRegisterResponse } = require('../services/salesService');

const registerSale = async (req, res) => {
  const requisition = [...req.body];
  console.log('reqbody', requisition);

  const saleResponse = await saleRegisterResponse(requisition);
  // const response = [];
  // requisition.forEach((elem) => [response.push(saleRegisterResponse(elem))]);
  // const saleResponse = await saleRegisterResponse(...requisition);
  // for (let i = 0; requisition.length > i; i += 1) {
  //   response.push(await saleRegisterResponse(requisition[i]));
  // }

  console.log('response', saleResponse);

  return res.status(201).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const [idFound] = await findSaleById(id);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const getSales = async (_req, res) => res.status(200).json(await getAllSales());

module.exports = {
  registerSale,
  getSales,
  showSalesById,
};