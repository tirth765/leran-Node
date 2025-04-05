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

// localhost:8000/api/v1/users/generateNewTokens
user.get(
    '/generateNewTokens',
    usersController.generateNewTokens
)

// localhost:8000/api/v1/users/logout
user.get(
    '/logout',
    usersController.user_logout
)

user.get(
    '/chackAuth',
    usersController.chackAuth
)
 
module.exports = user