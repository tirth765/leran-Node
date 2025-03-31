const express = require('express')
const { usersController } = require('../../../controller')

const user = express.Router()

// localhost:8000/api/v1/user/register
user.post(
    '/register',
    usersController.register_user
)

// localhost:8000/api/v1/user/login
user.post(
    '/login',   
    usersController.login_user
)

// localhost:8000/api/v1/user/refreshTokens
user.get(
    '/refreshTokens',
    usersController.refreshTokens
)

// localhost:8000/api/v1/user/logout
user.get(
    '/logout',
    usersController.logout_user
)

module.exports = user