const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const homeController = require("../controllers/homeController");
const cuentaController = require("../controllers/cuentaController");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");


module.exports = () => {
  router.get("/", authController.autenticarUsuario);
  router.get("/home", 
    authController.verificarUsuario,
    homeController.mostrarbalance 
    );
  router.get(
    "/cuenta/nueva",
    authController.verificarUsuario,
    cuentaController.formularioNuevaCuenta
  );
  router.post(
    "/cuenta/nueva",
    authController.verificarUsuario,
    cuentaController.agregarCuenta
  );
  // Mostrar una cuenta
  router.get("/cuenta/:url", cuentaController.mostrarCuenta);

// Editar una cuenta
router.get(
  "/cuenta/editar/:url",
  authController.verificarUsuario,
  cuentaController.formularioEditarCuenta
);
router.post(
  "/cuenta/editar/:url",
  authController.verificarUsuario,
  cuentaController.editarCuenta
);

// Eliminar una cuenta
router.delete("/cuenta/eliminar/:id", cuentaController.eliminarCuenta);


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

 // Iniciar sesión
 router.get("/iniciarSesion", usuarioController.formularioInicioSesion);
 router.post("/iniciarSesion", authController.autenticarUsuario);

  // Cerrar sesión
  router.get("/cerrarSesion", authController.cerrarSesion);

  // Administrar cuentas
  router.get(
    "/administrar",
    authController.verificarUsuario,
    authController.administrarCuentas
  );

  // Editar el perfil del usuario
  router.get(
    "/editarPerfil",
    authController.verificarUsuario,
    usuarioController.formularioEditarPerfil
  );
  router.post(
    "/editarPerfil",
    authController.verificarUsuario,
    usuarioController.subirImagen,
    usuarioController.editarPerfil
  );

return router;
};

