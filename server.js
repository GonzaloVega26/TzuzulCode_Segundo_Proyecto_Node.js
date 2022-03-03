//Imports
const express = require("express");
const path = require("path");
const { port } = require("./config");
const { engine } = require("express-handlebars");

//Routes Imports
//TODO: create routes files

//App Config
const app = express();

app.use(express.static(path.join(__dirname, "static"))); //Path to static elements for app

//Middlewares
app.use(express.urlencoded({ extended: true })); //Forms-encoded to JS objects

//Handlebars Template Engine Config

app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs") //Using template engine
app.set("views", "views") //Route for hbs files (html)


//Using Routes
//TODO: add app.use imported routes


//App port Config
app.listen(port, function () {
  console.log("App listening in: http://localhost:" + port);
});
