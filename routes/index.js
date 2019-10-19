const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.send("Hasta aqui funciona la app de Finanzas.");
  });

  return router;
};
