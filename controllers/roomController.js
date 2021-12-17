// ./server/controllers/roomController.js
const Room = require("./../models/Room");

exports.create = async (req, res) => {
  // DEL FORMULARIO, CREAMOS VARIABLES Y ASIGNAMOS VALORES.
  const { nombre, precio, color, imagen, descripcion } = req.body;

  // CREAR UNA ROOM EN BASE DE DATOS
  try {
    const newRoom = await Room.create({
      nombre,
      precio,
      color,
      imagen,
      descripcion,
    });

    // DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
    res.json({
      msg: "Room creado con éxito",
      data: newRoom,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error creando el room",
      error: error,
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({
      msg: "Rooms obtenidos con éxito.",
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
      error: error,
    });
  }
};

exports.readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);

    res.json({
      msg: "Room obtenido con éxito.",
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hubo un error obteniendo los datos del room",
      error: error,
    });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  const { nombre, precio, color, imagen, descripcion } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id, // ID DE ROOM
      {
        nombre,
        precio,
        color,
        imagen,
        descripcion, // PROPIEDADES A CAMBIAR
      },
      { new: true }
    );

    res.json({
      msg: "Roon actualizado con éxito.",
      data: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error con la actualización del room.",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRoom = await Room.findByIdAndRemove({ _id: id });

    res.json({
      msg: "Room borrado con éxito.",
      data: deletedRoom,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando el room",
      error: error,
    });
  }
};
