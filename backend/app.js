const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv/config')

const api = process.env.API_URL

app.use(express.json())
app.use(morgan('tiny'))

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
