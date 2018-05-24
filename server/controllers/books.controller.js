const books = require('../models/book.model')
const reviews = require('../models/review.model')

module.exports = {
  postBook: (req, res) => {
    const user = req.headers.decoded.userId
    const image = req.imageURL
    console.log("id user q ====> ", user)
    const { title, author, company } = req.body
    const newBook = new books({ user, title, author, company, image })
    
    newBook
      .save((err, result) => {
        if (!err) {
          res
            .status(201)
            .json({
            message: 'new book has been posted',
            newPost: result
          })
        } else {
          res
            .status(400)
            .json({
              message: 'failed to post new book',
              error: err
            })
        }
      })
  },
  getAllBook: (req, res) => {
    books
      .find()
      .populate('user')
      .populate({
        path: 'reviews',
        populate: [{
          path: 'user'
        }]
      })
      .then(books => {
        res
          .status(200)
          .json(books)
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  getBookById: function(req, res) {
    books
      .find({
        _id: req.params.id
      })
      .populate('user')
      .populate({
        path: 'reviews',
        populate: [{
          path: 'user'
        }]
      })
      .then(result => {
        res
          .status(200)
          .send({
            message: 'book by id',
            book: result
          })
      })
      .catch(err => {
        res
          .status(400)
          .send({
            error: err
          })
      })
  },
  deleteBook: (req, res) => {
    // const user = req.headers.decoded.userId
    books
      .findByIdAndRemove({
        _id: req.params.id
      }, function(err, result) {
        if (!err) {
          res
            .status(200)
            .json({
              message: 'book deleted',
              result
            })
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  },
  postReview: (req, res) => {
    const idUser = req.headers.decoded.userId
    const { id, userReview } = req.body
    const newReview = new reviews({ 
      user: idUser, 
      userReview })
      newReview
      .save()
      .then(result => {
        books
          .findByIdAndUpdate({
            _id: req.body.id
          }, {
            $push: {
              reviews: result.id
            }
          })
          .then(response => {
            res
              .status(200)
              .json({
                message: 'review posted',
                post: response
              })
          })
          .catch(err => {
            res
              .status(400)
              .json(err)
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  deleteReview: (req, res) => {
    const user = req.headers.decoded.userId
    reviews
      .findByIdAndRemove({
        _id: req.params.id
      }, function(err, result) {
        if (!err) {
          res
            .status(200)
            .json({
              message: 'review deleted',
              result
            })
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  }
}