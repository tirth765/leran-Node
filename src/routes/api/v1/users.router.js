const express = require('express')
const { usersController } = require('../../../controller')
const passport = require('passport')

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
user.post(
    '/logout',
    usersController.user_logout
)

// localhost:8000/api/v1/users/checkAuth
user.get(
    '/checkAuth',
    usersController.check_Auth
)

user.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  user.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    })
 
module.exports = user