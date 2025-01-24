const express = require('express')

const routes = express()

//http://localhost:8000/api/v1/subCategory/get-subCategores
routes.get(
    '/get-subCategores',

     (req, res) => {
    res.send('get subCategores')
})

//http://localhost:8000/api/v1/subCategory/post-subCategory
routes.post(
    '/post-subCategory',

     (req, res) => {
    res.send('post subCategory')
})

//http://localhost:8000/api/v1/subCategory/put-subCategory:id
routes.put(
    '/put-subCategory:id',

     (req, res) => {
    res.send('put subCategory')
})

//http://localhost:8000/api/v1/subCategory/delete-subCategory:id
routes.delete(
    '/delete-subCategory:id',

     (req, res) => {
    res.send('delete subCategory')
})

module.exports = routes;