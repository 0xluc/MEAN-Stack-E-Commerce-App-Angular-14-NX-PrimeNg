const { Op } = require('sequelize');
const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Product = require('../models/product') 
const Category = require('../models/categories')

const getAllProducts = async (req, res) => {
    if(req.query.categories){
        const filter = req.query.categories.split(',')
        const products = await Product.findAll({
            where: {
                category: {
                    [Op.or]: filter
                }
            },
            attributes: ['id', 'name', 'category'],
            include: {
                model: Category, as: 'productCategory'
            }
        })
        if(products.length > 0){
            res.status(200).json(products)
        }else{
            res.status(404).json({error: 'No products found'})
        }
    }else{
        const products = await Product.findAll({
            atributes: ['id', 'name', 'category'],
            include: {
                model: Category, as: 'productCategory'
            }
        })
        if(products.length > 0){
            res.status(200).json(products)
        }else{
            res.status(404).json({error: 'No products found'})
        }
    }
};



router.get(`/`, getAllProducts)
router.post(`/`, async (req, res) => {
    const category = await Category.findOne({
        where: {
            id: req.body.category
        }
    })
    if(!category){
        res.status(404).json({error: 'category not found'})
    }
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
router.get(`/:id`, async (req, res) => {
    try{
        const product = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Category, as: 'productCategory'

            }]
        })
        if(!product){
            res.status(404).json({error: 'product not found'})
        } else{
            res.status(200).json(product)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!product){
            res.status(404).json({error: 'product not found'})
        }
        else {
            const category = await Category.findOne({
                where: {
                    id: req.body.category
                }
            })
            if(!category){
                res.status(404).json({error: 'category not found'})
            }
            const updatedProduct = {
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
            await Product.update(updatedProduct, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(updatedProduct)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!product){
            res.status(404).json({error: 'product not found'})
        }
        else {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            }).then((productDeleted) => {
                res.status(200).json(productDeleted)
            })

        }
    } catch(error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.get(`/get/count`, async (req, res) => {
    const count = await Product.count()
    if(!count){
        res.status(404).json({error: 'product not found'})
    }
    else {
        res.status(200).json({count: count})
    }
})
router.get(`/get/featured/:count`, async (req, res) => {
    try {
        const count = parseInt(req.params.count, 10);
        if (isNaN(count)) {
          res.status(400).json({ error: 'Invalid count parameter' });
          return;
        }

        const featuredElements = await Product.findAll({
          where: { isFeatured: true },
          limit: count,
        });

        if (featuredElements.length === 0) {
          res.status(404).json({ error: 'No featured elements found' });
        } else {
          res.json({ elements: featuredElements });
        }
    }   catch (error) {
        res.status(500).json({ error: 'Failed to retrieve featured elements' });
  }
})
module.exports = router
