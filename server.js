//Imports
const express = require("express");
const path = require("path");
const { port } = require("./config");
const { engine } = require("express-handlebars");
const {query} = require("./config/database")

//Routes Imports
//TODO: create routes files
const userRoutes = require('./routes/userRoutes')
const authRoutes = require ('./routes/authRoutes')

//App Config
const app = express();

app.use(express.static(path.join(__dirname, "static"))); //Path to static elements for app

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Forms-encoded to JS objects

//Static elements

app.use(express.static(path.join(__dirname,"static")))


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
app.use(userRoutes)
app.use(authRoutes)
app.get("/", (req, resp)=>{
  return resp.render("home",{formCSS: "css/loginCSS.css", documentName: "Home"})
  
  
})

app.get("/datos", async (req, resp)=>{
const result = await query("SELECT * FROM users")
return resp.send(result)
})


//App port Config
app.listen(port, function () {
  console.log("App listening in: http://localhost:" + port);
});
