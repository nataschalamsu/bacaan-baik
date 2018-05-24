const mongoose = require('mongoose')
const Schema = mongoose.Schema

const booksSchema = Schema (
  {
    title: {
      type: String,
      required: [true, 'book title required']
    },
    author: {
      type: String,
      required: [true, 'book title required']
    },
    company: {
      type: String,
      required: [true, 'book title required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    image: String,
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'review'
    }]
  },
  {
    timestamps: true
  }
)

let book = mongoose.model('book', booksSchema)

module.exports = book