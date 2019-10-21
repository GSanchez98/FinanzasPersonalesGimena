const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const homeController = require("../controllers/homeController");
const cuentaController = require("../controllers/cuentaController");
const usuarioController = require("../controllers/usuarioController");

module.exports = () => {
  router.get("/", homeController.mostrarbalance);
  router.get("/cuenta/nueva", cuentaController.formularioNuevaCuenta);

  router.post("/cuenta/nueva", cuentaController.agregarCuenta);

  // Mostrar una cuenta
  router.get("/cuenta/:url", cuentaController.mostrarCuenta);

// Editar una cuenta
router.get("/cuenta/editar/:url", cuentaController.formularioEditarCuenta);
router.post("/cuenta/editar/:url", cuentaController.editarCuenta);

// Crear un usuario
router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
router.post(
  "/crearCuenta",
  [
    // Verificar los atributos del formulario
    check("nombre", "El nombre de usuario es requerido.")
      .not()
      .isEmpty()
      .escape(),
    check("email", "El correo electrónico es requerido.")
      .not()
      .isEmpty(),
    check("email", "El correo electrónico no es vålido.")
      .isEmail()
      .normalizeEmail(),
    check("password", "La contraseña es requerida.")
      .not()
      .isEmpty(),
    check("confirmpassword", "Debe ingresar la confirmación de tu contraseña")
      .not()
      .isEmpty(),
    check(
      "confirmpassword",
      "La confirmación de la contraseña no coincide con tu contraseña"
    ).custom((value, { req }) => value === req.body.password)
  ],
  usuarioController.agregarUsuario
);

return router;
};
