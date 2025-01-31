require('dotenv').config()
const express = require('express')
const route = require('./routes/api/v1')
const connectDB = require('./DB/mongoDB')
var cors = require('cors')

const app = express()
app.use(express.json())
const port = 8000

app.use('/public', express.static('public'))

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

//http://localhost:8000/product

connectDB()
app.use('/api/v1', route)


app.listen(8000, () => {
    console.log(`Example app listening on port`)
})
