const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");
const { validationResult } = require("express-validator");

exports.formularioNuevaCuenta = (req, res) => {
    res.render("nuevaCuenta", {
      nombrePagina: "Nueva cuenta",
      tagline: "Llena el formulario y publica una nueva cuenta",
      cerrarSesion: true,
      nombre: req.user.nombre
    });
  };
  
  // Agregar una nueva cuenta a la base de datos
  exports.agregarCuenta = async (req, res, next) => {

    // Verificar que no existan errores de validación
    const errores = validationResult(req);
    const erroresArray = [];

     // Si hay errores
    if (!errores.isEmpty()) {
      errores.array().map(error => erroresArray.push(error.msg));

      // Enviar los errores de regreso al usuario
      req.flash("error", erroresArray);

      res.render("nuevaCuenta", {
        nombrePagina: "Nueva cuenta",
        tagline: "¡Llena el formulario y publica una nueva cuenta!",
        messages: req.flash()
      });
      return;
    }
 
    const cuenta = new Cuenta(req.body);

    // Agregrando el usuario que crea la cuenta
    cuenta.autor = req.user._id;

    try{
      await cuenta.save();
      res.redirect(`/cuenta/${nuevaCuenta.url}`);
    } catch(error){
      // Ingresar el error al arreglo de errores
    erroresArray.push(error);
    req.flash("error", erroresArray);

  // renderizar la página con los errores
  res.render("nuevaCuenta", {
    nombrePagina: "Nueva Cuenta",
    tagline: "¡Llena el formulario y publica una nueva cuenta!",
    messages: req.flash()
  });
 }
};

   
  
  // Mostrar una cuenta
  exports.mostrarCuenta = async (req, res, next) => {
    const cuenta = await Cuenta.findOne({ url: req.params.url });
    // Si no hay resultados
    if (!cuenta) return next();
  
    res.render("cuenta", {
      nombrePagina: cuenta.nombre,
      nombre: req.user.nombre,
      cuenta,
    });
  };
  
// Muestra el formulario para editar una cuenta
exports.formularioEditarCuenta = async (req, res, next) => {
  const cuenta = await Cuenta.findOne({ url: req.params.url });

  // Si no existe la cuenta
  if (!cuenta) return next();

  res.render("editarCuenta", {
    nombrePagina: `Editar ${cuenta.nombre}`,
    cuenta,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

// Almacenar una cuenta editada
exports.editarCuenta = async (req, res, next) => {
  const cuentaEditada = req.body;

  console.log(cuentaEditada);

  // Almacenar la cuenta editada
  const cuenta = await Cuenta.findOneAndUpdate(
    { url: req.params.url },
    cuentaEditada,
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect(`/cuenta/${cuenta.url}`);
};

// Eliminar una cuenta
exports.eliminarCuenta = async (req, res) => {
  // Obtener el id de la cuenta
  const { id } = req.params;

  const cuenta = await Cuenta.findById(id);

  if (verificarUsuario(cuenta, req.user)) {
    // El usuario es el autor de la cuenta
    cuenta.remove();
    res.status(200).send("La cuenta ha sido eliminada correctamente");
  } else {
    // El usuario no es el autor, no permitir eliminación
    res.status(403).send("Error al momento de eliminar la cuenta");
  }
};

// Verificar que el autor de una cuenta sea el usuario enviado
const verificarUsuario = (cuenta = {}, usuario = {}) => {
  if (!cuenta.autor.equals(usuario._id)) {
    return false;
  }

  return true;
};