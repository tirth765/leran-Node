require('dotenv').config()
const express = require('express')
const route = require('./routes/api/v1')
const connectDB = require('./DB/mongoDB')

const app = express()
app.use(express.json())
const port = 8000
//http://localhost:8000/product

connectDB()
app.use('/api/v1', route)


app.listen(8000, () => {
    console.log(`Example app listening on port`)
})
