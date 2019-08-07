const mongoose = require("mongoose")
const Schema = mongoose.Schema

const retoSchema = new Schema({

    name: {
      type: String,
      required: [true, 'Ingrese un nombre para el reto']
    },
    description:{
      type: String,
      required: [true, 'Ingrese una descripción del reto']
    },
    points:{
      type: Number,
      required: [true, 'Ingrese los puntos del reto']
    },
    difficulty_level: {
      type: String,
      enum: ["Básico", "Medio", "Difícil"]
    },
    

})

const Reto = mongoose.model('Reto', retoSchema)

module.exports = Reto