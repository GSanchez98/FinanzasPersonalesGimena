const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
const cuentaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: "El nombre de la cuenta es requerido",
      trim: true
    },
    monto: {
      type: String,
      default: 0,
      trim: true
    },
    contrato: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      lowercase: true
    },
  });
  // Hooks para generar la URL (en Mongoose se conoce como middleware)
  cuentaSchema.pre("save", function(next) {
    // Crear la URL
    const url = slug(this.nombre);
    this.url = `${url}-${shortid.generate()}`;
  
    next();
  });
  
  module.exports = mongoose.model("Cuentas", cuentaSchema);
  