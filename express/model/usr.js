
const mysqlConnector = require('../db/mysql-connector')
const baseResponse = require('../helpers/base-response.helper')
const result = {};

result.getTypesFromDB = async function(){
  let mysql = null;
       
    try {
        mysql = await mysqlConnector.connection();
        const data = await mysql.query("call sp_get_user_types()", []);
       // console.log('data',data);
        if (Array.isArray(data) && data.length > 0) {
        
            baseResponse.data = data;
            baseResponse.success = true;
          }
    }catch(error){
        baseResponse.success = false;
        baseResponse.message = `service user.getUsersFromDB error : ${error}`;
        console.log(baseResponse.message);

    } finally {
        if (mysql) {
          await mysql.release();
        }
    }
    return baseResponse;

}
module.exports = result;
