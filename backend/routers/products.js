const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Product = require('../models/product') 

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



router.get(`/`, getAllProducts)
router.post(`/`, async (req, res) => {
    const product = {
        name: req.body.req,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        numreviews: req.body.numreviews,
        isfeatured: req.body.isfeatured,
        description: req.body.description,
        category: req.body.category,
        reviews: req.body.reviews,
        countinstock: req.body.countinstock,
        richdescription: req.body.richdescription,
        images: req.body.images
    }
    console.log(product)
    await Product.create(product).then((productadded) => {
        console.log("added product id:", productadded.id)
        res.status(200).json(productadded)
    }).catch((error) =>{
        console.log(error)
        res.status(500).json({error: 'internal server error'})
    })
})

module.exports = router
