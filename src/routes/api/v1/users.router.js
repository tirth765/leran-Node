const express = require('express')
const { usersController } = require('../../../controller')

const user = express.Router()

// localhost:8000/api/v1/users/register
user.post(
    '/register',
    usersController.user_register
)

user.get(
    'login',
    usersController.user_login
)

module.exports = user