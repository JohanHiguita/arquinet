//node populatedb <your mongodb url>​​​​

// Get arguments passed on command line
//var userArgs = process.argv.slice(2);

require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/user")
const Reto = require("./models/reto")

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongoDB.")
})

var users = []
var retos = []

const createReto = async data => {

  const reto = new Reto({
    name: data.name,
    description: data.description,
    points: data.points,
    difficulty_level: data.difficulty_level
  })

  try {
    const newReto = await reto.save()
    return newReto
  } catch (error) {
    console.log("Error creating reto: " + error)
  }

}

const createUser = async data => {

  const user = new User({
    googleId: data.googleId,
    username: data.username,
    isAdmin: data.isAdmin,
    email: data.email,
    picture: data.picture,
    retos: data.retos,
    has_admin_validation: true
  })

  try {
    const newUser = await user.save()
    return newUser
  } catch (error) {
    console.log("Error creating user: " + error)
  }
  
}

  
  mongoose.connection.close()