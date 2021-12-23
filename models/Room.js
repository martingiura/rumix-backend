// ./server/models/Room.js

// 1. IMPORTACIONES
const mongoose = require("mongoose");

// 2. SCHEMA
const roomSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

// 3. MODELO
const Room = mongoose.model("Room", roomSchema);

// 4. EXPORTACIÓN
module.exports = Room;
