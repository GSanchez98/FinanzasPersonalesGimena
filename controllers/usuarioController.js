const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const { validationResult } = require("express-validator");

const multer = require("multer");
const shortid = require("shortid");

// Caraga el formulario para la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta en Finanzas",
    tagline: "¡Comienza a publicar tus cuentas de forma gratuita!"
  });
};

// Almacena una cuenta de usuario
exports.agregarUsuario = async (req, res, next) => {
  console.log(req.body);


  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const erroresArray = [];

  // Si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

     // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      nombrePagina: "Crea tu cuenta en Finanzas",
      tagline: "¡Comienza a publicar tus cuentas de forma gratuita!",
      messages: req.flash()
    });
    return;
  }

  // Crear el usuario
  const usuario = new Usuario(req.body);

// tratar de almacenar el usuario
  try {
    await usuario.save();
    console.log("usuario ha sido almacenado")
    res.redirect("/iniciarSesion");
  } 
  catch (error) {
  // Ingresar el error al arreglo de errores
    erroresArray.push(error);
    req.flash("error", erroresArray);

  // renderizar la página con los errores
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta en finanzas",
    tagline: "¡Comienza a publicar tus cuentas de forma gratuita!",
    messages: req.flash()
  });
 }
};

// Mostrar el formulario de inicio de sesión
exports.formularioInicioSesion = (req, res) => {
res.render("iniciarSesion", {
  nombrePagina: "Iniciar sesión"
});
};

// Mostrar el formulario de editar perfil del usuario
exports.formularioEditarPerfil = (req, res) => {
  res.render("editarPerfil", {
    nombrePagina: "Edita el perfil de tu usuario en finanzas personales",
    usuario: req.user,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

// Almacena los cambios en el perfil del usuario
exports.editarPerfil = async (req, res) => {
  // Buscar el usuario
  const usuario = await Usuario.findById(req.user._id);

  // Modificar los valores
  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;

  if (req.body.password) {
    usuario.password = req.body.password;
  }

 // Verificar si el usuario agrega una imagen
 if (req.file) {
  usuario.imagen = req.file.filename;
}

// Guardar los cambios
await usuario.save();

req.flash("correcto", ["Cambios almacenados correctamente"]);

// Redireccionar
res.redirect("/administrar");
};


// Subir una imagen al servidor
exports.subirImagen = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      // Errores de multer
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          req.flash("error", [
            "El tamaño del archivo es demasiado grande. Máximo 200Kb"
          ]);
        } else {
          req.flash("error", [error.message]);
        }
      } else {
        // Errores del usuario
        req.flash("error", [error.message]);
      }
      // Redireccionar
      res.redirect("/administrar");
      return;
    } else {
      return next();
    }
  });
};

// Opciones de configuracion de Multer
const configuracionMulter = {
  // Tamaño máximo del archivo en bytes
  limits: {
    fileSize: 400000
  },
  // Dónde se almacena la imagen
  storage: (fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, __dirname + "../../public/uploads/perfiles");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  // Verificar que es una imagen válida mediante el mimetype
  // http://www.iana.org/assignments/media-types/media-types.xhtml
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      // El callback se ejecuta como true or false
      // se retorna true cuando se acepta la imagen
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no válido. Solo JPEG o PNG."), false);
    }
  }
};

const upload = multer(configuracionMulter).single("imagen");
