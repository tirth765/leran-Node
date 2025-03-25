const express = require('express')
const router = express.Router()
const port = 8000

//http://localhost:8000/product
const productRouter = require('./product.router')
const categoryRouter = require('./category.router')
const subCategoryRouter = require('./subCategory.router')
const couponRouter = require('./coupon.router')
const customerRouter = require('./customer.router')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/subCategory', subCategoryRouter)
router.use('/coupon',couponRouter)
router.use('/customer',customerRouter)

module.exports = router

