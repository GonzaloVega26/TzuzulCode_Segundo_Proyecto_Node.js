const User = require("../models/User")

class AuthController{

    getHomeView(req, resp){
        return resp.render("home",{formCSS: "css/loginCSS.css", documentName: "Home"})
        
    }

    getLoginView(req,res){
        return res.render("login",{formCSS: "/css/loginCSS.css", documentName: "Login"})
    }

    getRegistrationView(req,res){
        return res.render("registration",{formCSS: "css/loginCSS.css", documentName: "Registration"})
    }

    async login(req, res){
        const userCredential = req.body
        const user = (await User.readByEmail(userCredential.email))[0]
        
        
        //TODO: add check for user not found in db
        // if(user.length === 0){
        //     return res.render("login",{validation:{succes: false,
        //         errors:["Usuario no registrado"]
        //     }})
        // }
       
        if(user.password!==userCredential.password){
            return res.render("login",{validation:{
                errors:["Credenciales icorrectas"]
            }, formCSS: "css/loginCSS.css"})
        }

        /*---------Session Info---------*/
        req.session.loggedIn = true
        req.session.username = user.username
        req.session.idUser = user.id
        
            return res.redirect("/")
    
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
    
    async signUp(req,res){
        
        const newUser = new User(req.body)
        const validation = newUser.validate()
        
        if(validation.sucess){
            await newUser.save()
            return res.redirect("/")
        }
        
        return res.render("registration",{validation,user:newUser, formCSS: "css/loginCSS.css"})
    }

     
}

module.exports = AuthController