const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv/config')
const errorHandler = require('./helpers/errorHandler')
const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders')
const authJwt = require('./helpers/jwt')
const api = process.env.API_URL
const cors = require('cors')

// middleware
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static( __dirname + '/public/uploads'))
app.use(errorHandler)
// routers
app.use(`${api}/products` , productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)
// listen
app.listen(3000, () => {
    console.log('listening on port 3000')
})
