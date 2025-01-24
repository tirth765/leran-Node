require('dotenv').config()
const express = require('express')
const route = require('./routes/api/v1')

const app = express()
const port = 8000
//http://localhost:8000/product


app.use('/api/v1', route)


app.listen(8000, () => {
    console.log(`Example app listening on port`)
})
