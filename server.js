//Imports
const express = require("express");
const path = require("path");
const { port, secret } = require("./config");
const { engine } = require("express-handlebars");
const session = require("express-session")
const addSession = require("./middlewares/addSession")

/*---------Routes Imports---------*/
const userRoutes = require('./routes/userRoutes')
const authRoutes = require ('./routes/authRoutes')
const movieRoutes = require ('./routes/movieRoutes')



/*---------APP Configuration---------*/
const app = express();

app.use(express.static(path.join(__dirname, "static"))); //Path to static elements for app

/*---------APP Middlewares---------*/
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Forms-encoded to JS objects
app.use(session({
  secret:secret, //Cookie Encoder
  resave:false, //Dont send cookie every time
  saveUninitialized:false
}))
app.use(addSession)


/*---------Static Elements Route---------*/
app.use(express.static(path.join(__dirname,"static")))



/*---------Handlebars Template Engine Config---------*/
app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs") //Using template engine
app.set("views", "views") //Route for hbs files (html)



/*---------Using Routes---------*/
app.use(userRoutes)
app.use(authRoutes)
app.use(movieRoutes)

/*---------APP Port Config---------*/
app.listen(port, function () {
  console.log("App listening in: http://localhost:" + port);
});
