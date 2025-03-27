const express = require('express')
const { usersController } = require('../../../controller')

const user = express.Router()

// localhost:8000/api/v1/users/register
user.post(
    '/register',
    usersController.registerUser
)

// localhost:8000/api/v1/users/login
user.post(
    '/login',
    usersController.user_login
)

module.exports = user