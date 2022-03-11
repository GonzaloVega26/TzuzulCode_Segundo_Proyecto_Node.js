const express = require("express")
const MovieController = require("../controllers/movieController")

const router = express.Router()

const movieController = new MovieController()


router.get("/movies",movieController.getMoviesView)
router.get("/register-movie",movieController.getRegisterMovieView)
router.post("/register-movie",movieController.addMovieView)


module.exports = router