require('dotenv').config()
const express = require('express')

const app = express()
const port = 8000

app.listen(8000, () => {
    console.log(`Example app listening on port`)
})

app.get('/demo', (req, res) => {
    res.send('get Method!')
})

app.post('/demo', (req, res) => {
    res.send('post Method!')
})

// console.log('Hello Node!', process.env.PORT);
