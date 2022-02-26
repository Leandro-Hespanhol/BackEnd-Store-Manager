const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const registerSale = async (req, res) => {
  const requisition = req.body;

  const storageProducts = await productsService.getAllProducts();
  requisition.map((buyer) => {
    storageProducts.map((storage) => {
      if (storage.id === buyer.productId && storage.quantity < buyer.quantity) {
        return res.status(422).json({
          message: 'Such amount is not permitted to sell',
        });
      }
      return true;
    });
    return true;
  });

  const saleResponse = await salesService.saleRegisterResponse(requisition);

  return res.status(201).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const idFound = await salesService.searchSaleById(id);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const requisition = req.body;
  const idFound = await salesService.searchSaleById(id);

  if (!idFound) return res.status(404).json({ message: 'Sale not found' });

  const saleEdited = await salesService.saleEdition(id, requisition);

  res.status(200).json(saleEdited);
};

const getSales = async (_req, res) => res.status(200).json(await salesService.getEverySales());

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await salesService.saleDeletion(id);

  if (!isDeleted) return res.status(404).json({ message: 'Sale not found' });

  return res.status(204).end();
};

module.exports = {
  registerSale,
  getSales,
  showSalesById,
  editSale,
  deleteSale,
};