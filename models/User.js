// ./server/models/User.js
// 1. IMPORTACIONES
const mongoose = require("mongoose");

// 2. SCHEMAS
const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    default: "",
  },
  pais: {
    type: String,
    default: "",
  },
  direccion: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default:
      "https://virtualxperiences.com/38nacional/assets/images/current-event/speakers/Dr-Eduardo-Rafael-Garcia/pic.jpg",
  },
  telefono: {
    type: String,
    default: "",
  },
  rol: {
    type: String,
    default: "",
  },
  roomatesWishList: {
    type: Array,
    default: [],
  },
  profilesIsPublic: {
    type: Boolean,
    default: true,
  },
  verifiedStatus: {
    type: Boolean,
    default: false,
  },
  genre: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 18,
  },
  favoriteRooms: {
    type: Array,
    default: [],
  },
  profileSummary: {
    type: String,
    default: "",
  },
  profileDescription: {
    type: String,
    default: "",
  },
  prefferedLocation: {
    type: String,
    required: true,
    default: "Ciudad de Mexico",
  },
  movingDate: {
    type: Date,
    default: "01/01/2022",
  },
  budget: {
    type: Number,
    default: 5000,
  },
  frequencyCleaningRoom: {
    type: String,
    default: "",
  },
  smokingPreferences: {
    type: String,
    default: "",
  },
  petsPreferences: {
    type: String,
    default: "",
  },
  visitPreferences: {
    type: String,
    default: "",
  },
  acceptedConnections: {
    type: Array,
    default: [],
  },
});

// 3. MODELOS
const User = mongoose.model("User", userSchema);

// 4. EXPORTACIÓN
module.exports = User;
