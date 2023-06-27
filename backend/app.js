const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv/config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_URL,
    dialect: 'mysql'    
})

const Product = require('./models/product') 
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const api = process.env.API_URL

app.use(express.json())
app.use(morgan('tiny'))

app.get(`${api}/products`, getAllProducts)

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct) 
    res.send(newProduct)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
