const express = require('express')
const app = express()
const morgan = require('morgan')
var mysql = require('mysql')
require('dotenv/config')

const connection = mysql.createConnection({
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    socketPath: process.env.DB_SOCKET
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected");
})

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
