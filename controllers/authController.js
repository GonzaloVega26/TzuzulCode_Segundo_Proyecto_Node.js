const User = require("../models/User")

class AuthController{

    getLoginView(req,res){
        return res.render("login",{formCSS: "/css/loginCSS.css"})
    }

    getRegistrationView(req,res){
        return res.render("registration",{formCSS: "css/loginCSS.css"})
    }

    async signUp(req,res){
        // req.body:
        // {
        //     username:"tzuzulcode",
        //     firstName:"Tzuzul",
        //     ...
        // }

        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)
        console.log(newUser);
        if(validation.sucess){
            await newUser.save()
            return res.redirect("/")
        }
        
        return res.render("registration",{formCSS: "css/loginCSS.css",validation,user:newUser})
    }
}

module.exports = AuthController