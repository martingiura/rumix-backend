// ./server/controllers/stores.js
const Store = require("./../models/Store");

exports.create = async (req, res) => {
  // DEL FORMULARIO, CREAMOS VARIABLES Y ASIGNAMOS VALORES.
  const { nombre, domicilio, telefono } = req.body;

  // CREAR UN STORE EN BASE DE DATOS
  try {
    const newStore = await Store.create({
      nombre,
      domicilio,
      telefono,
    });

    // DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
    res.json({
      msg: "Store creado con éxito",
      data: newStore,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error creando EL Store",
      error: error,
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const stores = await Store.find({});

    res.json({
      msg: "Stores btenidos con éxito.",
      data: stores,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos de stores",
      error: error,
    });
  }
};

exports.readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Store.findById(id);

    res.json({
      msg: "Store obtenido con éxito.",
      data: store,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hubo un error obteniendo los datos del store.",
      error: error,
    });
  }
};
exports.edit = async (req, res) => {
  const { id } = req.params;

  const { nombre, domicilio, telefono } = req.body;

  try {
    const updatedStore = await Store.findByIdAndUpdate(
      id, // ID DE STORE
      {
        nombre,
        domicilio,
        telefono, // PROPIEDADES A CAMBIAR
      },
      { new: true }
    );

    res.json({
      msg: "Store actualizado con éxito.",
      data: updatedStore,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error con la actualización del Store",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStore = await Store.findByIdAndRemove({ _id: id });

    res.json({
      msg: "Store borrado con éxito.",
      data: deletedStore,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando el Store",
      error: error,
    });
  }
};
