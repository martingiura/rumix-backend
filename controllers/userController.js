// ./server/controllers/userController.js
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./../models/User");

// CREAR UN USUARIO
exports.create = async (req, res) => {
  // 1. OBTENER USUARIO, EMAIL Y PASSWORD DEL FORMULARIO (REQ)
  const {
    nombre,
    apellido,
    pais,
    direccion,
    email,
    password,
    imageUrl,
    telefono,
    rol,
    roomatesWishList,
    profileIsPublic,
    verifiedStatus,
    genre,
    age,
    favoriteRooms,
    profileSummary,
    profileDescription,
    prefferedLocation,
    movingDate,
    budget,
    frequencyCleaningRoom,
    smokingPreferences,
    petsPreferences,
    visitPreferences,
    acceptedConnections,
  } = req.body;

  // 2A. REALIZAR EL PROCESO ASÍNCRONO
  try {
    // 3. GENERAR PASSWORD PARA BASE DE DATOS
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 4. CREAR USUARIO EN BASE DE DATOS
    const newUser = await User.create({
      nombre,
      apellido,
      pais,
      direccion,
      email,
      password: hashedPassword,
      imageUrl,
      telefono,
      rol,
      roomatesWishList,
      profileIsPublic,
      verifiedStatus,
      genre,
      age,
      favoriteRooms,
      profileSummary,
      profileDescription,
      prefferedLocation,
      movingDate,
      budget,
      frequencyCleaningRoom,
      smokingPreferences,
      petsPreferences,
      visitPreferences,
      acceptedConnections,
    });

    // 5. AUTENTICACIÓN CON TOKENS
    // A. CREAR UN PAYLOAD (INFORMACIÓN DEL USUARIO)
    const payload = {
      user: {
        id: newUser._id, // ID DE MONGODB DEL USUARIO
      },
    };

    // B. FIRMAR EL TOKEN
    jwt.sign(
      payload, // DATOS QUE ACOMPAÑARAN AL TOKEN
      process.env.SECRET, // PALABRA SECRETA (FIRMA)
      {
        expiresIn: 360000, // EXPIRACIÓN DEL TOKEN
      },
      (error, token) => {
        if (error) throw error;

        res.json({
          msg: "Token correctamente generado.",
          data: token,
        });
      }
    );
  } catch (error) {
    // 2B. EN CASO DE ERROR CON AWAIT
    res.status(500).json({
      msg: "Hubo un error con la creación de usuario.",
      error: error,
    });
  }
};

// INICIAR SESIÓN
// AUTENTICAR QUE LA PERSONA PASE SU EMAIL Y CONTRASEÑA. COINCIDAN. Y SE LE ENVÍA UN TOKEN.
exports.login = async (req, res) => {
  // 1. OBTENER EL EMAIL Y EL PASSWORD DEL FORMULARIO (JSON)
  const { email, password } = req.body;

  try {
    // 2. ENCONTRAR UN USUARIO EN BASE DE DATOS
    const foundUser = await User.findOne({ email });

    // 3. VALIDACIÓN - SI NO HUBO UN USUARIO...
    if (!foundUser) {
      return res.status(400).json({
        msg: "El usuario o la contraseña son incorrectos.",
      });
    }

    // 4. SI TODO OK, EL USUARIO FUE ENCONTRADO, ENTONCES, EVALUAMOS LA CONTRASEÑA.
    const verifiedPass = await bcryptjs.compare(password, foundUser.password);

    // 5. VALIDACIÓN - SI EL PASSWORD NO COINCIDE...
    if (!verifiedPass) {
      return await res.status(400).json({
        msg: "El usuario o la contraseña no coinciden.",
      });
    }

    // 6. SI TODO COINCIDE Y ES CORRECTO, GENERAMOS UN JSON WEB TOKEN

    console.log("foundUser:", foundUser);

    // 6A. ESTABLECER UN PAYLOAD (DATOS DEL USUARIO)
    const payload = {
      user: {
        id: foundUser.id,
      },
    };

    // 6B. FIRMA DEL JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({
          msg: "Inicio de sesión exitoso.",
          data: token,
        });
      }
    );

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema con la autenticación.",
      data: error,
    });
  }
};

// VERIFICAR USUARIO
// CUANDO ESTAMOS ACCEDIENDO A DIFERENTES RUTAS (GUITARRAS COMO TIENDAS) PREGUNTAR SI EL USUARIO TIENE PERMISOS O NO. ENTONCES, PARA CONFIRMARLO, SE LE PIDE SU TOKEN.
// UNA RUTA QUE PIDE TOKENS PARA VERIFICAR
exports.verifyToken = async (req, res) => {
  try {
    // 1. BUSCAR EL ID DEL USUARIO (DEL TOKEN ABIERTO) EN BASE DE DATOS

    const foundUser = await User.findById(req.user.id).select("-password");

    return res.json({
      msg: "Datos de usuario encontrados.",
      data: foundUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error con el usuario",
    });
  }
};
exports.readAll = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      msg: "Usuarios obtenidos con éxito.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos del Usuario",
      error: error,
    });
  }
};

exports.readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.json({
      msg: "Usuarios obtenidos con éxito.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hubo un error obteniendo los datos.",
      error: error,
    });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  const {
    nombre,
    apellido,
    pais,
    direccion,
    email,
    imageUrl,
    telefono,
    rol,
    roomatesWishList,
    profileIsPublic,
    verifiedStatus,
    genre,
    age,
    favoriteRooms,
    profileSummary,
    profileDescription,
    prefferedLocation,
    movingDate,
    budget,
    frequencyCleaningRoom,
    smokingPreferences,
    petsPreferences,
    visitPreferences,
    acceptedConnections,
  } = req.body;

  try {
    const findUser = await User.findById(id);

    const updatedUser = await User.findByIdAndUpdate(
      id, // ID DE USUARIO
      {
        nombre,
        apellido,
        pais,
        direccion,
        email,
        password: findUser.password,
        imageUrl,
        telefono,
        rol,
        roomatesWishList,
        profileIsPublic,
        verifiedStatus,
        genre,
        age,
        favoriteRooms,
        profileSummary,
        profileDescription,
        prefferedLocation,
        movingDate,
        budget,
        frequencyCleaningRoom,
        smokingPreferences,
        petsPreferences,
        visitPreferences,
        acceptedConnections, // PROPIEDADES A CAMBIAR
      },
      { new: true }
    );

    res.json({
      msg: "Usuario actualizado con éxito.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error con la actualización del usuario.",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndRemove({ _id: id });

    res.json({
      msg: "Usuario borrado con éxito.",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando el Usuario.",
      error: error,
    });
  }
};
