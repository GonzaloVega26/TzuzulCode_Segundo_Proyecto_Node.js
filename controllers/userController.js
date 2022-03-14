const User = require("../models/User")

class UserController{

    async getUsersView(req,res){
        const data = await User.readAll()
        //console.log(req.session.typeUser);
        return res.render("users",{
            formCSS: "/css/loginCSS.css",
            users:data,
            hasUsers:data.length > 0,
            typeUser: req.session.typeUser
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

   async getUserProfileView(req,res){
       const user = (await  User.readOne(req.session.idUser))[0]
       console.log(user)
        return res.render("profile",{formCSS: "css/profile.css", userData: user})
    }

    getHomeView(req,res){
        return res.render("home",{formCSS: "css/loginCSS.css"})
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