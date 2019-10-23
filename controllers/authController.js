const passport = require("passport");
const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");

exports.autenticarUsuario = passport.authenticate("local", {
  
  successRedirect: "/administrar",
  failureRedirect: "/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});

// Mostrar el panel de administración (Dashboard)
exports.administrarCuentas = async (req, res) => {
  // Obtener el usuario autenticado
  const cuentas = await Cuenta.find({ autor: req.user._id });

  console.log(cuentas);

  res.render("administracion", {
    nombrePagina: "Panel de administración",
    tagline: "Crea y administra tus cuentas desde aquí",
    cerrarSesion: true,
    nombre: req.user.nombre,
    cuentas
  });
};

// Cerrar la sesión del usuario actual
exports.cerrarSesion = (req, res) => {
  // Cierra la sesión actual
  req.logout();

  req.flash("correcto", [
    "Has cerrado tu sesión correctamente. ¡Vuelve pronto!"
  ]);

  return res.redirect("/iniciarSesion");
};

// Verificar si el usuario se encuentra autenticado
exports.verificarUsuario = (req, res, next) => {
  // Retorna true si el usuario ya realizó la autenticación
  if (req.isAuthenticated()) {
    next();
  }
  else
  {
    // Si no se autenticó, redirecccionarlo al inicio de sesión
  res.redirect("/iniciarSesion");
  }
  
};
