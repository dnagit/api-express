
//const mysqlConnector = require('../db/mysql-connector')
const baseResponse = require('../helpers/base-response.helper')
const result = {};
const mysql  = require('mysql')
const config = require('../config')

result.getTypesFromDB = async function(){
  console.log('config',config);

  const connection = await mysql.createConnection({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    connectionLimit: 100,
    debug: false,
    queueLimit: 0
  });   
   connection.connect();
    try {
       const data = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `user_type` WHERE is_active = 1', (err, result, fields) => {
          
          if (err) reject(err);
          resolve(result);
        });
      });
     // await Promise.all();

      
       
        console.log('data',data);
        //const data = await mysql.query('SELECT * FROM `user_type` WHERE is_active = 1');
       
        if (Array.isArray(data) && data.length > 0) {
        
          baseResponse.data = data;
          baseResponse.success = true;
          }
    }catch(error){
        baseResponse.success = false;
        baseResponse.message = `service user.getUsersFromDB error : ${error}`;
        console.log(baseResponse.message);

    } finally {
        if (connection) {
          await connection.end();
        }
    }
    return baseResponse;

}

module.exports = result;
