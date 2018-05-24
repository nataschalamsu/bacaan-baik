require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const book = require('./routes/books')
const user = require('./routes/users')
const review = require('./routes/reviews')

mongoose.connect('mongodb://admin:admin@ds233500.mlab.com:33500/bacaanbaik');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(morgan('dev'))

app.use('/books', book)
app.use('/users', user)
app.use('/reviews', review)

app.listen(3000, (connect => {
  console.log('=====CONNECTED=====')
}))
