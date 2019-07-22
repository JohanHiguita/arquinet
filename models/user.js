const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    googleId: String,
    username: String,
    isAdmin: Boolean,
    points: Number,

    //done_challenges: Objs
    //medals: Objs
})

const User = mongoose.model('user', userSchema)

module.exports = User