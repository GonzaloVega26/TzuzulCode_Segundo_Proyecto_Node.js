const User = require("../models/User")

class UserController{

    async getUsersView(req,res){
        const data = await User.readAll()
        
        return res.render("home",{
            users:data,
            hasUsers:data.length > 0
        })
    }
}

module.exports = UserController