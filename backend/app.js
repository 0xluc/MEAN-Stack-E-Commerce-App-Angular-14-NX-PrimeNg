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

app.post(`${api}/products`, async (req, res) => {
    const product = {
        name: req.body.req,
        image: req.body.image,
        brand: req.body.image,
        price: req.body.image,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        description: req.body.description,
        category: req.body.category,
        reviews: req.body.reviews,
        countInStock: req.body.countInStock,
        richDescription: req.body.richDescription,
        images: req.body.images
    }
    console.log(newProduct) 
    await Product.create(product).then((productAdded) => {
        console.log("Added product id:", productAdded.id)
        res.send(newProduct)
    }).catch((error) =>{
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
