// Funções de checkout

document.getElementById('checkout-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const paymentMethod = document.getElementById('payment-method').value;

  // Validate the form data
  if (!name || !email || !address || !paymentMethod) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Process payment based on the selected payment method
  if (paymentMethod === 'credit-card') {
    processCreditCardPayment(name, email, address);
  } else if (paymentMethod === 'debit-card') {
    processDebitCardPayment(name, email, address);
  } else if (paymentMethod === 'paypal') {
    processPaypalPayment(name, email, address);
  }
  
  alert('Pedido realizado com sucesso!');
});

function processCreditCardPayment(name, email, address) {
  // Implementar lógica de processamento de pagamento com cartão de crédito
  console.log('Processando pagamento com cartão de crédito para', name);
}

function processDebitCardPayment(name, email, address) {
  // Implementar lógica de processamento de pagamento com cartão de débito
  console.log('Processando pagamento com cartão de débito para', name);
}

function processPaypalPayment(name, email, address) {
  // Implementar lógica de processamento de pagamento com PayPal
  console.log('Processando pagamento com PayPal para', name);
}

// Funções de registro de usuário

const express = require('express');
const app = express();

// Importar bibliotecas necessárias para o registro de usuário
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Configurar middleware para receber dados no formato JSON
app.use(express.json());

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('E-mail já registrado.');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const user = new User({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    });

    // Salvar usuário no banco de dados
    await user.save();

    res.status(201).send('Usuário registrado com sucesso.');
  } catch (error) {
    res.status(500).send('Erro ao registrar usuário.');
  }
});

// Classe Produto e Funções de Estoque

class Product {
  constructor(id, name, description, price, category, stock) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
  }
}

let inventory = [];

function addProduct(id, name, description, price, category, stock) {
  const product = new Product(id, name, description, price, category, stock);
  inventory.push(product);
}

function subtractUnits(productId, unitsSold) {
  const product = inventory.find((product) => product.id === productId);
  if (product) {
    product.stock -= unitsSold;
  } else {
    console.log('Produto não encontrado.');
  }
}

// Adicionar produtos ao inventário
addProduct(1, 'Nike Air Max', 'High-performance running shoes', 150, 'Footwear', 10);
addProduct(2, 'Adidas T-shirt', 'Comfortable and stylish sports shirt', 30, 'Clothing', 20);

// Subtrair unidades vendidas
subtractUnits(1, 2); // Subtrair 2 unidades de Nike Air Max
subtractUnits(2, 5); // Subtrair 5 unidades de camiseta Adidas

console.log(inventory);
