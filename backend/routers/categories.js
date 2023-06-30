const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Category = require('../models/categories') 

const getAllCategories = async (req, res) => {
    sequelize.sync().then(() => {
        Category.findAll().then(categ => {
                res.json(categ)
            }).catch((error)=>{
                console.log(error)
                res.status(500).json({error: 'Internal server error'})
            })
        })
}

router.get(`/`, getAllCategories)
router.post(`/`, async (req, res) => {
    const category = {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon
    };
    console.log(category)
    await Category.create(category).then((categoryadded) => {
        console.log("added category id:". categoryadded.id)
        res.status(200).json(categoryadded)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({error: 'internal server error'})
    })
})
router.delete('/:id', async (req, res) => {
    await Category.destroy({
        where: {
            id: req.params.id
        }
    }).then((categorydeleted) => {
        res.status(200).json(categorydeleted)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    })
})
router.get('/:id', async (req, res) => {
    await Category.findOne({
        where: {
            id: req.params.id
        }
    }).then((category) => {
        res.json(category)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    })
})
router.put('/:id', async (req, res) => {
    updatedCategory = {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon
    }
    await Category.update(updatedCategory, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json(updatedCategory)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    })
})
module.exports = router
