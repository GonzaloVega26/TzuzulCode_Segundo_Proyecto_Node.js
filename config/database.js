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

async function query(){
    try {
        const results = await promisedPool.query("SELECT * FROM users")
        return results[0]
    } catch (error) {
        console.log(error)
    }
    
    return  null
}


async function insert(tableName,data){
    try{
        const result = await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data),Object.values(data)])
        console.log(result)
        return {idGenerated: result.insertId, succes: true}
    }catch(error){
        return {error,success:false}
    }
}


async function del(tableName,data){
    try{
       const result = await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
       console.log(result)
        return {data: data, success: true, result}
    }catch(error){
        return {error,success:false}
    }
}


module.exports = {query,insert,del}
