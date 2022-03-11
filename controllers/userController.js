const User = require("../models/User")

class UserController{

    async getUsersView(req,res){
        const data = await User.readAll()
        
        return res.render("home",{
            users:data,
            hasUsers:data.length > 0
        })
    }

    getUserProfileView(req,res){
        return res.render("profile",{formCSS: "css/loginCSS.css"})
    }
}

module.exports = UserController