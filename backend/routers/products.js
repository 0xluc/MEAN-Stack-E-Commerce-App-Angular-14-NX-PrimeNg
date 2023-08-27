const { Op } = require('sequelize');
const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Product = require('../models/product') 
const Category = require('../models/categories')
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidType = FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('Invalid image type.')
    if (isValidType) {
      uploadError = null
    }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype]
    const fileName = file.originalname.split(' ').join('_')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + fileName + '.' + extension)
  }
})

const uploadOptions = multer({ storage: storage })
const getAllProducts = async (req, res) => {
    if(req.query.categories){
        const filter = req.query.categories.split(',')
        const products = await Product.findAll({
            where: {
                category: {
                    [Op.or]: filter
                }
            },
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
router.post(`/`, uploadOptions.single('image'),async (req, res) => {
    const category = await Category.findOne({
        where: {
            id: req.body.category
        }
    })
    if(!category){
        res.status(404).json({error: 'category not found'})
    }
    const file = req.file
    if(!file) return res.status(400).send('No file')
    const fileName  = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`
    const product = {
        name: req.body.name,
        image: basePath,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        description: req.body.description,
        category: req.body.category,
        reviews: req.body.reviews,
        countInStock: req.body.countInStock,
        richDescription: req.body.richDescription,
        images: req.body.images,
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

router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    console.log(req.body)
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
            console.log(req.body)
            const category = await Category.findOne({
                where: {
                    id: req.body.category
                }
            })
            console.log(category)
            if(!category){
                return res.status(404).json({error: 'category not found'})
            }
            const file = req.file
            let imagePath

            if(file) {
                const fileName  = req.file.filename
                const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`
                imagePath = basePath
            } else {
                imagePath = product.image
            }
            const updatedProduct = {
                name: req.body.name,
                image: imagePath,
                brand: req.body.brand,
                price: req.body.price,
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

router.put('/gallery-images/:id', uploadOptions.array('images', 10),async (req, res) => {
    try{
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!product){
            return res.status(404).json({error: 'product not found'})
        }
        let imagesPaths = []
        const files = req.files
        if(files){
            files.map((file) => {
                imagesPaths.push(`${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`)
            })
        }
        const updatedProduct = {
            images: imagesPaths
        }
        const productUpdated = await Product.update(updatedProduct, {
            where: {
                id: req.params.id
            }
        })
        if(!productUpdated){
            return res.status(404).json({error: 'product not found'})
        }
        res.status(200).json(updatedProduct)
    }catch (error) {
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
          res.status(200).json( featuredElements );
        }
    }   catch (error) {
        res.status(500).json({ error: 'Failed to retrieve featured elements' });
  }
})
module.exports = router
