exports.formularioNuevaCuenta = (req, res) => {
    res.render("nuevaCuenta", {
      nombrePagina: "Nueva cuenta",
      tagline: "Llena el formulario y publica una nuevo registro"
    });
  };
  