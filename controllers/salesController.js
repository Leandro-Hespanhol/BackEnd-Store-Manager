const { saleRegisterResponse, saleEdition, 
  getEverySales, searchSaleById } = require('../services/salesService');

const registerSale = async (req, res) => {
  const requisition = req.body;

  const saleResponse = await saleRegisterResponse(requisition);

  return res.status(201).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const idFound = await searchSaleById(id);
  console.log(idFound);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const requisition = req.body;
  const idFound = await searchSaleById(id);

  if (!idFound) return res.status(404).json({ message: 'Sale not found' });

  const saleEdited = await saleEdition(id, requisition);

  res.status(200).json(saleEdited);
};

const getSales = async (_req, res) => res.status(200).json(await getEverySales());

module.exports = {
  registerSale,
  getSales,
  showSalesById,
  editSale,
};