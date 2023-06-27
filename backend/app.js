const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv/config')
const Sequelize = require('sequelize')
const sequelize = require('./db')
const Product = require('./models/product') 

const getAllProducts = async (req, res) => {
    sequelize.sync().then(() => {
        Product.findAll().then(prod => {
            res.json(prod)
        }).catch((error) =>{
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
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
