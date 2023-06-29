const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Order = require('../models/orders')

const getAllOrders = async (req,res) => {
    sequelize.sync().then(() => {
        Order.findAll().then(order => {
            res.json(order)
        }).catch((error) => {
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
}

router.get(`/`, getAllOrders)
module.exports = router