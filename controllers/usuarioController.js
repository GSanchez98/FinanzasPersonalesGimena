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
    nombrePagina: "Edita el perfil de tu usuario en DevFinder",
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

  // Guardar los cambios
  await usuario.save();

  req.flash("correcto", ["Cambios almacenados correctamente"]);

  // Redireccionar
  res.redirect("/");
};

// Subir una imagen al servidor
exports.subirImagen = (req, res, next) => {
  upload(req, res, function(error) {
    if (error instanceof multer.MulterError) {
      return next();
    }
  });
  next();
};

// Opciones de configuracion de Multer
const configuracionMulter = {};

const upload = multer(configuracionMulter).single("imagen");

