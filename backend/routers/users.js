const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const User = require('../models/users')

const getAllUsers = async (req, res) => {
    sequelize.sync().then(() => {
        User.findAll().then(prod => {
            res.json(prod)
        }).catch((error) =>{
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        })
    })
};

router.get(`/`, getAllUsers)
module.exports = router