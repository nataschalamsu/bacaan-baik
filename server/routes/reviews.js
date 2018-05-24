const routes = require('express').Router()
const { postReview, deleteReview } = require('../controllers/books.controller')
const { isLogin } = require('../middlewares/authentication')

routes
  .post('/', isLogin, postReview)
  .delete('/:id', isLogin, deleteReview)

module.exports = routes