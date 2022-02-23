require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const { createProduct, selectAll, 
  selectbyId, editProduct, deleteProduct, 
  regiterSale } = require('./controllers/productsController');

const { nameValidation, quantityValidation, 
  productIdValidation, 
  repeatedProduct } = require('./middlewares/validation');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', selectAll);

app.get('/products/:id', selectbyId);

app.post('/products', nameValidation, repeatedProduct, quantityValidation,
rescue(createProduct));

app.put('/products/:id', quantityValidation, nameValidation, 
editProduct);

app.delete('/products/:id', deleteProduct);

app.get('./sales');

app.get('./sales/:id');

app.post('/sales', productIdValidation, quantityValidation, regiterSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
