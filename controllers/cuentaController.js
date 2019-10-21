const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");

exports.formularioNuevaCuenta = (req, res) => {
    res.render("nuevaCuenta", {
      nombrePagina: "Nueva cuenta",
      tagline: "Llena el formulario y publica una nuevo registro"
    });
  };
  
  // Agregar una nueva cuenta a la base de datos
  exports.agregarCuenta = async (req, res) => {
    const cuenta = new Cuenta(req.body);
  
    // Almacenar en la base de datos
    const nuevaCuenta = await cuenta.save();
  
    // Redireccionar
    res.redirect(`/cuenta/${nuevaCuenta.url}`);
  };
  
  // Mostrar una cuenta
  exports.mostrarCuenta = async (req, res, next) => {
    const cuenta = await Cuenta.findOne({ url: req.params.url });
  
    // Si no hay resultados
    if (!cuenta) return next();
  
    res.render("cuenta", {
      nombrePagina: cuenta.nombre,
      cuenta
    });
  };
  
// Muestra el formulario para editar una vacante
exports.formularioEditarCuenta = async (req, res, next) => {
  const cuenta = await Cuenta.findOne({ url: req.params.url });

  // Si no existe la cuenta
  if (!cuenta) return next();

  res.render("editarCuenta", {
    nombrePagina: `Editar ${cuenta.nombre}`,
    cuenta
  });
};

// Almacenar una cuenta editada
exports.editarCuenta = async (req, res, next) => {
  const cuentaEditada = req.body;

  // Convertir las skills a un arreglo de skills
  cuentaEditada.skills = req.body.skills.split(",");

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
