const Rental = require("../models/Rental")
const Movie = require("../models/Movie")

class RentalController{

    async getRentalsView(req, res){
        const data = await Rental.readAll()
        //console.log(data);
        return res.render("rentals",{
            formCSS: "/css/loginCSS.css",
            rentals:data,
            hasRentals:data.length > 0,
            // typeUser: req.session.typeUser
        })
    }

    async getRentalsUserView(req, res){
        const id = req.params.id
        const data = await Rental.readRentalUser(id)
        //console.log(data);
        return res.render("rentals",{
            formCSS: "/css/loginCSS.css",
            rentals:data,
            hasRentals:data.length > 0,
            // typeUser: req.session.typeUser
        })
    }

    async addRentalView(req, res){
        const data = req.body
        const newRental = new Rental(data)
        await newRental.updateStock(newRental.idMovie)
        await newRental.save()
        //console.log(data)
        return res.redirect("/rentals/"+req.session.idUser)
    }

    async getAddRentalView(req, res){
        if (req.session.loggedIn){
            const id = req.params.id
            // const movie = Movie.readOne(id)
            // console.log(movie);
            const tiempoTranscurrido = Date.now();
            const today = new Date(tiempoTranscurrido);
            return res.render("register-rental", {
                formCSS: "/css/loginCSS.css",
                idMovie: id,
                today: today
            })
        }
        else{
            return res.redirect("/login")
        }
        
    }

    async returnMovieView(req, res){
        const id = req.params.id
        const data = await Rental.returnMovie(id)
        return res.redirect("/rentals/" + req.session.idUser)
    }
    // getUserProfileView(req,res){
    //     return res.render("profile",{formCSS: "css/loginCSS.css"})
    // }

    // getHomeView(req,res){
    //     return res.render("home",{formCSS: "css/loginCSS.css"})
    // }

    async deleteRentalView(req, res){
        const id = req.params.id
        const data = await Rental.delete(id)
        return res.render("home",{
            formCSS: "/css/loginCSS.css"
            // users:data,
            // hasUsers:data.length > 0
        })
        // const data = req.body
        // const newUser = new User(data)
        // const register = await newUser.save()
        // console.log(data)
        // return res.render("home",{
        //     users:data,
        //     hasUsers:data.length > 0
        // })
    }
}

module.exports = RentalController