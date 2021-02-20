const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
    name: String,
    date: String,
    title: String,
    genre: String,
    streamingOn: String,
    rating: Number,
    likes: Number,
    dislikes: Number
})

module.exports.Film = mongoose.model('Film', filmSchema)