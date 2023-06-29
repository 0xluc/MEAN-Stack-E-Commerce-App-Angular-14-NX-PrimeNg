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
module.exports = router