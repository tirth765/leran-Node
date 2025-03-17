const express = require('express')
const { productController } = require('../../../controller')
const upload = require('../../../middleware/Upload')

const routes = express.Router()

//http://localhost:8000/api/v1/product/searchProduct
routes.get(
    '/searchProduct',
    productController.searchProduct
)

//http://localhost:8000/api/v1/product/list/category
routes.get(
    '/list/category',
    productController.CategoryProduct
)   

//http://localhost:8000/api/v1/product/list/subcategory
routes.get(
    '/list/subcategory',
    productController.SubCategoryProduct
)

//http://localhost:8000/api/v1/product/variant-details
routes.get(
    '/variant-details',
    productController.ProductVariant
)

//http://localhost:8000/api/v1/product/count-categories
routes.get(
    '/count-categories',
    productController.ProductforCategory
)

routes.get(
    '/get-products',
    productController.getproducts
)

// http://localhost:8000/api/v1/product/get-subcat  
routes.get(
    '/get-subcat/:id',
    productController.getSubcat

)

// http://localhost:8000/api/v1/product/post-product  
routes.post(
    '/post-product',
    upload.single("product_img"),
    productController.postproduct
)

// http://localhost:8000/api/v1/product/put-product  
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