const {query,insert} = require("../config/database")

class User{
    idUser
    constructor(user){
        this.name = user.name
        this.email = user.email
        this.birthday = user.birthday
        this.profilePicture = user.profilePicture
        this.password = user.password
        this.confirmPassword = user.confirmPassword
    }



 //El metodo puede ser utilizado sin crear una instancia
 static async readAll(){
    return await query("SELECT * FROM users")
}

async save(){
    
    const newUser = await insert("users",{
        name:this.name,
        email:this.email,
        birthday:this.birthday,
        profilePicture:this.profilePicture,
        password:this.password
    })
    this.idUser = newUser
}

async update(newUser){
    const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
}

async delete(){
    await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
}


validate(){
    let result = {sucess:true,errors:[]}
    if(!(this.name && this.username && this.email && this.password && this.passwordRepeated)){
        result.sucess = false
        result.errors.push("Rellena todos los campos")
    }
    if(this.password!==this.passwordRepeated){
        result.sucess = false
        result.errors.push("Las contraseñas no coinciden")
    }
    return result
}


}

module.exports = User