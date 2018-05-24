const routes = require('express').Router()
const multer = require('multer')
const { postBook, getAllBook, getBookById, deleteBook, postReview, deleteReview } = require('../controllers/books.controller')
const { isLogin } = require('../middlewares/authentication')
const middlewareUpload = require('../middlewares/upload')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

routes
  .get('/', getAllBook)
  .post('/', isLogin, uploaderMem.single('image'), middlewareUpload.upload, postBook)
  .get('/:id', getBookById)
  .delete('/:id', isLogin, deleteBook)

module.exports = routes