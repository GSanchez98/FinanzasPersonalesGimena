const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const router = require("./routes/index");

const mongoose = require("mongoose");
require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Habilitando el archivo de variables de entorno
require("dotenv").config({ path: "variables.env" });


const app = express();

// HABILITANDO HANDLEBARS
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout"
  })
);

app.set("view engine", "handlebars");

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));


app.use("/", router());

app.listen(8800);
