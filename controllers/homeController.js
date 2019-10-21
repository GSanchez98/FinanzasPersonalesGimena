const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");

exports.mostrarbalance = async (req, res, next) => {
  // Obtener todos los documentos de las cuentas
  const cuentas = await Cuenta.find();

  console.log(cuentas);

  // Si no hay cuentas
  if (!cuentas) return next();

  res.render("home", {
    nombrePagina: "Finanzas Personales",
    tagline: "Administra y controla tu dinero de una mejor manera.",

    descripcion:"Le ayudamos a gestionar su economía personal compruebe aquí el estado de sus cuentas, empiece a hacer el presupuesto y organice sus deudas.",
    crearCuenta: "Conozca los pasos a seguir para evitar sorpresas al invertir sus ahorros: defina su perfil y vigile sus inversiones.",
    inicioSesion: "!Accede ya! y continua manejando de manera eficiente y eficaz tus finanzas",
    cuentas
  });
};
