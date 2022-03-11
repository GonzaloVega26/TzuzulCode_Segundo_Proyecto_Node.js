const Movie = require("../models/Movie")

class MovieController{

    async getMoviesView(req,res){
        const data = await Movie.readAll()
        console.log(data)
        return res.render("movie",{
            formCSS: "/css/loginCSS.css",
            movies:data,
            hasMovies:data.length > 0
        })
    }

    getRegisterMovieView(req,res){
        return res.render("register-movie",{formCSS: "css/loginCSS.css"})
    }
    async addMovieView(req,res){

        const newMovie = new Movie(req.body)
        console.log(newMovie)
        const validation = newMovie.validate()
        if(validation.sucess){
            await newMovie.save()
            return res.redirect("/movies")
        }
        
        return res.render("register-movie",{formCSS: "css/loginCSS.css",validation,movie:newMovie})
    }
}

module.exports = MovieController