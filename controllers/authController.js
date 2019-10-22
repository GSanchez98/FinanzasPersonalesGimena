const passport = require("passport");
const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});
