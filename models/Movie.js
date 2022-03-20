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
    static async readAllOrder(order){
            //console.log(order)
            return await query(`SELECT * FROM movies ORDER BY nombre ${order}`)
        
    }
//USER 1 Pelicula 8
//SELECT * FROM movies JOIN (SELECT idMovie,SUM(calification) FROM rentals GRoUP BY idMovie) as table1 ON movies.idMovie = table1.idMovie;

    static async readAllOrderRating(){
        
        // return await query(`SELECT * FROM movies LEFT JOIN (SELECT idMovie,SUM(calification) as rating FROM rentals GROUP BY idMovie) as table1 ON movies.idMovie = table1.idMovie ORDER BY table1.rating DESC;`)
        return await query(`SELECT * FROM movies LEFT JOIN (SELECT idMovie, SUM(calification) / COUNT(idRental) as rating FROM rentals WHERE calification IS NOT NULL GROUP BY idMovie) as table1 ON movies.idMovie = table1.idMovie ORDER BY table1.rating DESC;`)
    }

    static async readAllOrderMoreViews(){
        return await query("SELECT * FROM movies LEFT JOIN (SELECT idMovie, COUNT(idRental) as rating FROM rentals GROUP BY idMovie) as table1 ON movies.idMovie = table1.idMovie ORDER BY table1.rating DESC")
    }

    static async searchMovie(nameMovie){
        return await query(`SELECT * FROM movies WHERE nombre LIKE "%` + nameMovie + `%"`)
    }

    static async readOne(id){
        return await query("SELECT * FROM movies WHERE idMovie=" + id)
    }

    async save(){
        const newMovie = await insert("movies",{
            nombre:this.nombre,
            precio:this.precio,
            portada:this.portada,
            stock:this.stock,
            sinopsis:this.sinopsis
        })
        this.idMovie = newMovie.idMovie
    }

    static async update(newMovie){
        const id = await query("UPDATE movies SET ? WHERE idMovie = ?" ,[newMovie, newMovie.idMovie])
    }

    static async delete(id){
        await query("DELETE FROM movies WHERE idMovie = " + id)
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