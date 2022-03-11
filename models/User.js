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
static async readOne(id){
    return await query("SELECT * FROM users WHERE idUser=" + id)
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
    return this.idUser
}

async update(newUser){
    const id = await query("UPDATE users SET ? WHERE idUser = ?" ,[newUser,this.idUser])
}

static async delete(id){
    await query("DELETE FROM users WHERE idUser = " + id)
}


validate(){
    let result = {sucess:true, errors:[]}
    if(!(this.name && this.email && this.birthday && this.password && this.confirmPassword)){
        result.sucess = false
        result.errors.push("Rellena todos los campos")
    }
    if(this.password!==this.confirmPassword){
        result.sucess = false
        result.errors.push("Las contraseñas no coinciden")
    }
    return result
}


}

module.exports = User