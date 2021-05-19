const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Firstname: String,
    Email: String,
    Password: String,
    token: String,
    Age: String,
    Description: String,
    FavoritesSports: Array,
    SportsHabits: String,
    SportsHours: String,
    UserPicture: String,
    UserLatitude: Number,
    UserLongitude: Number
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel