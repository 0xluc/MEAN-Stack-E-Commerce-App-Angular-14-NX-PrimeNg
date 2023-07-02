const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const User = require('../models/users')
const bcrypt = require('bcryptjs')

const getAllUsers = async (req, res) => {
    sequelize.sync().then(() => {
        User.findAll({
            attributes: ['id', 'name', 'email', 'isAdmin', 'phone', 'city', 'country', 'street', 'zip', 'apartment']
        }).then(users=> {
            res.json(users)
        }).catch((error) =>{
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
};
router.get(`/`, getAllUsers)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'email', 'isAdmin', 'phone', 'city', 'country', 'street', 'zip', 'apartment']
        })
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        } else{
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.post(`/`, async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        isAdmin: req.body.isAdmin,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
        zip: req.body.zip,
        apartment: req.body.apartment
    };
    console.log(user)
    await User.create(user).then((userAdded) => {
        console.log(userAdded)
        console.log("added user id:", userAdded['id'])
        res.status(200).json(userAdded)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({error: 'internal server error'})
    })
})

router.get(`/`, getAllUsers)
module.exports = router
