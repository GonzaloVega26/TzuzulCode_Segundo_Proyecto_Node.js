const mysql = require("mysql2");
const ENV_VARS = require(".");

const connection = mysql.createConnection({
  host: ENV_VARS.dbHost,
  port: ENV_VARS.dbPort,
  user: ENV_VARS.dbUser,
  password: ENV_VARS.dbPassword,
  database: ENV_VARS.dbName,
});

const pool = mysql.createPool({
  host: ENV_VARS.dbHost,
  port: ENV_VARS.dbPort,
  user: ENV_VARS.dbUser,
  password: ENV_VARS.dbPassword,
  database: ENV_VARS.dbName,
})

const promisedPool = pool.promise()

async function query(sql){
    try {
        const results = await promisedPool.query(sql)
        return results[0]
    } catch (error) {
        console.log(error)
    }

    return  null
}


async function insert(tableName,data){
    try{
        const sql = `INSERT INTO ${tableName} (name, email, birthday,profilePicture, password) `
        + `VALUES('${data.name}', '${data.email}','${data.birthday}','${data.profilePicture}' ,'${data.password}');`
        //const result = await query(`INSERT INTO ${tableName} (??) VALUES(?)`,[Object.keys(data),Object.values(data)])
        
        const result = await query(sql)
        
        return {idGenerated: result.insertId, succes: true}
    }catch(error){
        return {error,success:false}
    }
}


async function del(tableName,data){
    try{
       const result = await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
      
        return {result: result, success: true}
    }catch(error){
        return {error,success:false}
    }
}


module.exports = {query,insert,del}
