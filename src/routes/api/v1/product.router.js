const express = require('express')
const { productController } = require('../../../controller')
const upload = require('../../../middleware/Upload')

const routes = express.Router()

//http://localhost:8000/api/v1/product/get-products
routes.get(
    '/get-products',
    productController.getproducts
)

routes.post(
    '/post-product',
    upload.single("product_img"),
    productController.postproduct
)


routes.put(
    '/put-product/:id',
    upload.single("product_img"),

    productController.putproduct
)

routes.delete(
    '/delete-product/:id',
    productController.deleteproduct
)

module.exports = routes;