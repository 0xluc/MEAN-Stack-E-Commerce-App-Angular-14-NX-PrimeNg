const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const Order = require('../models/orders')
const Order_Items = require('../models/orderItems')
const Product = require('../models/product')
const User = require('../models/users')
const Category = require('../models/categories')

const getAllOrders = async (req,res) => {
    sequelize.sync().then(() => {
        Order.findAll({
            include: [
                {
                    model: User, attributes: ['id', 'name', 'email'], as:'userInfo'
                },
                {
                    model: Order_Items, 
                    include: [
                        {
                            model: Product,
                            include: [
                                {
                                    model: Category, as: 'productCategory'
                                }
                            ]
                        }    
                    ]
                }
            ]

        }).then(order => {
            res.json(order)
        }).catch((error) => {
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
}

router.get(`/`, getAllOrders)
router.get('/:id', async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: User, attributes: ['id', 'name', 'email'], as:'userInfo'
                },
                {
                    model: Order_Items, 
                    include: [
                        {
                            model: Product,
                            include: [
                                {
                                    model: Category, as: 'productCategory'
                                }
                            ]
                        }    
                    ]
                }
            ]
        })
        if (!order){
            return res.status(404).json({error: 'Order not found'})
        }
        res.send(order)
    } catch (error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.get('/get/userorders/:userid', async (req, res) => {
    try{
        const userOrderList = await Order.findAll({
            where: {
                user: req.params.userid
            },
            include: [
                {
                    model: Order_Items,
                    include: [
                        {
                            model: Product,
                            include: [
                                {
                                    model: Category, as: 'productCategory'
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        if(!userOrderList){
            return res.status(404).json({error: 'Order not found'})
        }
        res.send(userOrderList)
    } catch (error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.post(`/`, async (req, res) => {
    try{
        let orderAdded
        let totalPrice = 0
        const promises = req.body.orderItems.map(async (orderItem) => {
            await Product.findByPk(orderItem.product_id).then((product) => {
                totalPrice += orderItem.quantity * parseFloat(product.price)
            })
        })
        await Promise.all(promises)
        const order = {
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user
        }
        await Order.create(order).then((orderAd) => {
            orderAdded = orderAd
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
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!order){
            res.status(404).json({error: 'order not found'})
        }
        else {
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            }).then( async () => {
                await Order_Items.destroy({
                    where: {
                        order_id: req.params.id
                    }
                })
            }).then(() =>{
                res.status(200).json({message: 'order deleted'})
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/get/totalsales', async (req, res) => {
    try {
        const totalsales = await sequelize.query(
            `SELECT SUM(totalPrice) as totalsales FROM orders`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
        res.json(totalsales)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
module.exports = router
