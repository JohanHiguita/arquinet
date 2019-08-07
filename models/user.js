const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    googleId: String,
    username: String,
    isAdmin: Boolean,
    email: String,
    picture: String,
    retos : [{ type: Schema.Types.ObjectId, ref: 'Reto' }],
    has_admin_validation: { type: Boolean, default: false }
})

/* // Virtual for points
userSchema
.virtual('points')
.get(() => {
    const solved_retos = this.retos

  return this.family_name + ', ' + this.first_name;
});


//Virtual level
userSchema
.virtual('level')
.get(() => {
    const solved_retos = this.retos

  return this.family_name + ', ' + this.first_name;
}); */

const User = mongoose.model('user', userSchema)

module.exports = User