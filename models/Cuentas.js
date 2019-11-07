const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
const cuentaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required:["El nombre de la cuenta es requerido"],
      trim: true
    },
    monto: {
      type: Number,
      default: 0,
      required:"El monto de la cuenta es requerido",
      trim: true
    },
    tipo: {
      type: String,
      required:"El tipo de cuenta es requerido",
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      lowercase: true
    },
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: "El autor es obligatorio"
  }
  });
  // Hooks para generar la URL (en Mongoose se conoce como middleware)
  cuentaSchema.pre("save", function(next) {
    // Crear la URL
    const url = slug(this.nombre);
    this.url = `${url}-${shortid.generate()}`;
  
    next();
  });
  
  module.exports = mongoose.model("Cuenta", cuentaSchema);