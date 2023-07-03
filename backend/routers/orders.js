const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Order = require('../models/orders')
const Order_Items = require('../models/orderItems')

const getAllOrders = async (req,res) => {
    sequelize.sync().then(() => {
        Order.findAll({
            include: Order_Items,
        }).then(order => {
            res.json(order)
        }).catch((error) => {
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
}

router.get(`/`, getAllOrders)
router.post(`/`, async (req, res) => {
    try{
        let orderAdded
        let orderItems = []
        const order = {
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user
        }
        console.log(order)
        await Order.create(order).then((orderAd) => {
            orderAdded = orderAd
            console.log("added order id:", orderAdded.id)
        }).then(() =>{
            req.body.orderItems.map(async (orderItem) => {
                await Order_Items.create({
                    order_id: orderAdded.id,
                    product_id: orderItem.product_id,
                    quantity: orderItem.quantity
                })
                })
        }
        ).then(() => {
            order.orderItems = req.body.orderItems
            res.status(201).json(order)
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!order){
            res.status(404).json({error: 'product not found'})
        }
        else {
            const updatedOrder = {
                status: req.body.status
            }
            await Order.update(updatedOrder, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(updatedOrder)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
module.exports = router