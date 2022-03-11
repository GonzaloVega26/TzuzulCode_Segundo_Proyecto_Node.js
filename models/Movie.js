const {query,insert} = require("../config/database")

class Movie{
    idMovie
    constructor(movie){
        this.nombre = movie.nombre
        this.precio = movie.precio
        this.portada = movie.portada
        this.stock = movie.stock
        this.sinopsis = movie.sinopsis
    }
 //El metodo puede ser utilizado sin crear una instancia
 static async readAll(){
    return await query("SELECT * FROM movies")
}

async save(){
    
    const newMovie = await insert("movies",{
        nombre:this.nombre,
        precio:this.precio,
        portada:this.portada,
        stock:this.stock,
        sinopsis:this.sinopsis
    })
    this.idMovie = newMovie
}

async update(newMovie){
    const id = await query("UPDATE movies SET ? WHERE id = ?" ,[newMovie,this.idMovie])
}

async delete(){
    await query("DELETE FROM movies WHERE id = ?",[this.idMovie])
}


validate(){
    let result = {sucess:true,errors:[]}
    if(!(this.nombre && this.portada && this.precio && this.stock && this.sinopsis)){
        result.sucess = false
        result.errors.push("Rellena todos los campos")
    }
    return result
}


}

module.exports = Movie