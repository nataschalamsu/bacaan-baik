const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = Schema (
  {
    userReview: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

let review = mongoose.model('review', reviewSchema)

module.exports = review