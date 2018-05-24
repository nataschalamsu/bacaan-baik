const routes = require('express').Router()
const { signIn, signUp } = require('../controllers/users.controller')

routes
  .post('/signin', signIn)
  .post('/signup', signUp)

module.exports = routes