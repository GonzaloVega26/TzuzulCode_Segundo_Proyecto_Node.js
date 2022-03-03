const mysql = require('mysql2')
const  ENV_VARS  = require('.')

const connection = mysql.createConnection({
    host:ENV_VARS.dbHost,
    port:ENV_VARS.dbPort,
    user:ENV_VARS.dbUser,
    password:ENV_VARS.dbPassword,
    database:ENV_VARS.dbName
})