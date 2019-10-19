const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes/index");

const app = express();

// HABILITANDO HANDLEBARS
app.engine(
  "Handlebars",
  exphbs({
    defaultLayout: "layout"
  })
);

app.set("view engine", "handlebars");

app.use("/", router());

app.listen(8800);
