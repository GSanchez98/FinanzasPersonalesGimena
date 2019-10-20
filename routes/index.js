const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const cuentaController = require("../controllers/cuentaController");

module.exports = () => {
  router.get("/", homeController.mostrarbalance);
  router.get("/cuenta/nueva", cuentaController.formularioNuevaCuenta);

  return router;
};
