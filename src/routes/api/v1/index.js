const express = require('express')
const router = express.Router()
const port = 8000

//http://localhost:8000/product
const productRouter = require('./product.router')
const categoryRouter = require('./category.router')
const subCategoryRouter = require('./subCategory.router')
const usersRouter = require('./users.router')
const paymentRouter = require('../../../../Routes/payment')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/subCategory', subCategoryRouter)
router.use('/users', usersRouter)
router.use('/payment', paymentRouter)

module.exports = router

