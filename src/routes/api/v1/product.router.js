const express = require('express')

const routes = express.Router()

//http://localhost:8000/api/v1/product/get-products
routes.get(
    '/get-products',

     (req, res) => {
    res.send('get products')
})

routes.post(
    '/post-product',

     (req, res) => {
    res.send('post product')
})


routes.put(
    '/put-product:id',

     (req, res) => {
    res.send('put product')
})

routes.delete(
    '/delete-product:id',

     (req, res) => {
    res.send('delete product')
})

module.exports = routes;