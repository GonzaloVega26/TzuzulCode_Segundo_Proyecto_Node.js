const User = require("../models/User")

class UserController{

    async getUsersView(req,res){
        const data = await User.readAll()
        //console.log(data)
        return res.render("home",{
            formCSS: "/css/loginCSS.css",
            users:data,
            hasUsers:data.length > 0
        })
    }

    async addUserView(req,res){
        const data = req.body
        const newUser = new User(data)
        const register = await newUser.save()
        console.log(data)
        return res.render("home",{
            users:data,
            hasUsers:data.length > 0
        })
    }

    async deleteUserView(req,res){
        const id = req.params.id
        const data = await User.delete(id)
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

module.exports = UserController