const mongoose = require('mongoose')

const placesSchema = mongoose.Schema({
    name: String,
    address: String,
    sport: String,
    description: String,
    latitude: Number,
    longitude: Number,
    picture: String
})

const placesModel = mongoose.model('places', placesSchema)

module.exports = placesModel