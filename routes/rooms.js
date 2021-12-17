// ./server/routes/rooms.js

// 1. IMPORTACIONES
const express = require("express");
const router = express.Router();

const roomController = require("./../controllers/roomController");

// 2. RUTEO (ROUTER)

// CREAR GUITARRA
router.post("/create", roomController.create);

// LEER ROOM
router.get("/readall", roomController.readAll);

// LEER UN ROOM
router.get("/readone/:id", roomController.readOne);

// ACTUALIZAR UN ROOM
router.put("/edit/:id", roomController.edit);

// BORRAR UN ROOM
router.delete("/delete/:id", roomController.delete);

// 3. EXPORTACIONES
module.exports = router;
