const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv/config')
const Sequelize = require('sequelize')

const productsRouter = require('./routers/products')
const api = process.env.API_URL

// middleware
app.use(express.json())
app.use(morgan('tiny'))
// routers
app.use(`${api}/products` , productsRouter)
// listen
app.listen(3000, () => {
    console.log('listening on port 3000')
})
