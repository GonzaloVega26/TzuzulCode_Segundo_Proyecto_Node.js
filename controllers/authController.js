const User = require("../models/User")
const Movie = require("../models/Movie")
class AuthController{

    async getHomeView(req, resp){
        const pictureOfFilms = (await Movie.readAll())
        
        return resp.render("home",{formCSS: "css/home.css", documentName: "Home", movies: pictureOfFilms})
        
    }

    getLoginView(req,res){
        // console.log(req.session)
        return res.render("login",{formCSS: "/css/loginCSS.css", documentName: "Login"})
    }

    getRegistrationView(req,res){
        return res.render("registration",{formCSS: "css/loginCSS.css", documentName: "Registration"})
    }

    async login(req, res){
        const userCredential = req.body
        const user = await User.readByEmail(userCredential.email)
        if(user.length === 0){
            return res.render("login",{
                formCSS: "/css/loginCSS.css",
                validation:{
                errors:["Usuario no registrado"]
            }})
        }
        //TODO: add check for user not found in db
        // if(user.length === 0){
        //     return res.render("login",{validation:{succes: false,
        //         errors:["Usuario no registrado"]
        //     }})
        // }
        if(user[0].password!==userCredential.password){
            return res.render("login",{
                formCSS: "css/loginCSS.css",
                validation:{
                errors:["Credenciales icorrectas"]
            }})
        }    
        /*---------Session Info---------*/
        req.session.loggedIn = true
        req.session.idUser = user[0].idUser
        if (user[0].typeUser === 1){
            req.session.typeUser = true
            return res.redirect("/users")
        }
        else {
            req.session.typeUser = false
            return res.redirect("/")
        }
    
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
    
    async signUp(req,res){
        
        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)

        if(newUser.email === "admin@admin.com"){
            newUser.typeUser = 1;
        }else{
            newUser.typeUser = 0;
        }

        if(validation.success){
            await newUser.save()
            
            return res.redirect("/")
        }
        
        return res.render("registration",{validation,user:newUser, formCSS: "css/loginCSS.css"})
    }

     
}

module.exports = AuthController