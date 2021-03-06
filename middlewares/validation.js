const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
   }

  next();
};
const quantityNumberValidation = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity && typeof quantity !== 'number') { // -1
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0 || typeof quantity !== 'number') {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const quantityAmountValidation = (req, res, next) => {
  try {
  const requisition = req.body;
  if (requisition.some(({ quantity }) => !quantity)) {
    return res.status(400)
      .json({ message: '"quantity" is required' });
  }
  if (requisition.some(({ quantity }) => quantity <= 0)) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
} catch (e) {
    next(e);
  }
};

const productIdValidation = (req, res, next) => {
  try {
  const requisition = req.body;
  if (requisition.some((elem) => !elem.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
} catch (e) {
  next(e);
}
};

module.exports = {
 nameValidation,
 quantityValidation,
 quantityNumberValidation,
 quantityAmountValidation,
 productIdValidation,
};
