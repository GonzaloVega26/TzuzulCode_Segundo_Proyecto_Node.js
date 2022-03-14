const {query,insert} = require("../config/database")

class Rental{
    idRental
    constructor(user){
        this.idUser = user.idUser
        this.idMovie= user.idMovie
        this.fechaAlquiler = user.fechaAlquiler
        this.fechaDev = user.fechaDev
        this.fechaRealDev = user.fechaRealDev
        this.estado = user.estado
        this.comision = user.comision
    }

 //El metodo puede ser utilizado sin crear una instancia
static async readAll(){
    return await query("SELECT * FROM rentals, users, movies WHERE rentals.idUser = users.idUser and rentals.idMovie = movies.idMovie")
}

static async readRentalUser(id){
    return await query("SELECT * FROM rentals, users, movies WHERE rentals.idUser = users.idUser and rentals.idMovie = movies.idMovie and rentals.idUser=" + id)
}



static async readOne(id){
    return await query("SELECT * FROM rentals WHERE idRental=" + id)
}

// static async readByEmail(email){
//     const user = await query("SELECT * FROM rentals WHERE email = ?", [email])
//     return user
// }

async save(){
    
    const newRental = await insert("rentals",{
        idUser: this.idUser,
        idMovie: this.idMovie,
        fechaAlquiler: this.fechaAlquiler,
        fechaDev: this.fechaDev,
        fechaRealDev: this.fechaRealDev,
        estado: this.estado,
        comision: this.comision
    })
    this.idRental = newRental
    // console.log("En User")
    // console.log(newUser)
    return this.idRental
}

async update(newRental){
    const id = await query("UPDATE rentals SET ? WHERE idRental = ?" ,[newRental,this.idRental])
}

static async delete(id){
    await query("DELETE FROM rentals WHERE idRental = " + id)
}

async updateStock(id){
    await query("UPDATE movies SET stock = stock - 1 WHERE idMovie = " + id)
}

validate(){
    let result = {success:true, errors:[]}
    if(!(this.idUser && this.idMovie && this.fechaAlquiler && this.fechaDev && this.estado)){
        result.success = false
        result.errors.push("Rellena todos los campos")
    }
    // if(this.password!==this.confirmPassword){
    //     result.success = false
    //     result.errors.push("Las contraseñas no coinciden")
    // }
    // if(this.profilePicture.length === 0){
    //     this.profilePicture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbPpWCdbVZP5eHwbuND4LmHOUqQBjKAiT9Q&usqp=CAU'
    // }
    return result
}


}

module.exports = Rental