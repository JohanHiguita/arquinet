const mongoose = require("mongoose")
const Schema = mongoose.Schema

const retoSchema = new Schema({

    name: String,
    description: String,
    points: Number,
    difficulty_level: {
      type: String,
      enum: ["Básico", "Medio", "Difícil"]
    },
    

})

const Reto = mongoose.model('Reto', retoSchema)

module.exports = Reto