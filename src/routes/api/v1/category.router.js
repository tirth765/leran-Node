const express = require('express')

const routes = express.Router()

//http://localhost:8000/api/v1/category/get-categores
routes.get(
    '/get-categores',

     (req, res) => {
    res.send('get categores')
})

//http://localhost:8000/api/v1/category/post-category
routes.post(
    '/post-category',

     (req, res) => {
    res.send('post category')
})

//http://localhost:8000/api/v1/category/put-category:id
routes.put(
    '/put-category:id',

     (req, res) => {
    res.send('put category')
})

//http://localhost:8000/api/v1/category/delete-category:id
routes.delete(
    '/delete-category:id',

     (req, res) => {
    res.send('delete category')
})
module.exports = routes;