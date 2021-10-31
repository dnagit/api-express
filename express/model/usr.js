
const mysqlConnector = require('../db/mysql-connector')
const baseResponse = require('../helpers/base-response.helper')
const result = {};

result.getTypesFromDB = async function(){
  let mysql = null;
       
    try {
        mysql = await mysqlConnector.connection();
        //const data = await mysql.query("call sp_get_user_types()", []);
        const data = await mysql.rawquery("SELECT * FROM groups WHERE is_active = 1");
       //console.log('data',data);
        if (Array.isArray(data) && data.length > 0) {
        
            baseResponse.data = data;
            baseResponse.success = true;
          }
    }catch(error){
        baseResponse.success = false;
        baseResponse.message = `service user.getTypesFromDB error : ${error}`;
        console.log(baseResponse.message);

    } finally {
        if (mysql) {
          await mysql.release();
        }
    }
    return baseResponse;

}
result.getUserbyEmailFromDB = async function(email){
  let mysql = null;

  try {
    mysql = await mysqlConnector.connection();
      //const data = await mysql.query("call sp_get_user_types()", []);
      const data = await mysql.rawquery("SELECT * FROM users WHERE email = ?",[email]);
    //console.log('data',data);
    
      if (Array.isArray(data) && data.length > 0) {
      
          baseResponse.data = data;
          baseResponse.success = false;
      }else{
       
        baseResponse.data = {};
        baseResponse.success = true;

      }
  }catch(error){
      baseResponse.success = false;
      baseResponse.message = `service user.getUserbyEmailFromDB error : ${error}`;
      console.log(baseResponse.message);

  } finally {
      if (mysql) {
        await mysql.release();
    }
  }
  return baseResponse;

}
result.userLoginFromDB = async function(params){
  let mysql = null;

  try {
    mysql = await mysqlConnector.connection();
      //const data = await mysql.query("call sp_get_user_types()", []);
      console.log('params',params);
      const data = await mysql.rawquery("SELECT id,email,group_id FROM users WHERE email = ? and password = ?",[params.email, params.password]);
      console.log('data',data);
    
      if (Array.isArray(data) && data.length > 0) {
      
          baseResponse.data = data[0];
          baseResponse.success = true;
      }else{
       
        baseResponse.data = [];
        baseResponse.success = false;

      }
  }catch(error){
      baseResponse.success = false;
      baseResponse.message = `service user.getUserbyEmailFromDB error : ${error}`;
      console.log(baseResponse.message);

  } finally {
      if (mysql) {
        await mysql.release();
    }
  }
  return baseResponse;

}
result.registerUerFromDB = async function(params){
  let mysql = null;
  console.log('params',params);

  try {
    mysql = await mysqlConnector.connection();
      //const data = await mysql.query("call sp_get_user_types()", []);
      const res = await mysql.rawquery("INSERT INTO users (email, password, group_id, is_active, created_at) VALUES (?,?,?,?,?)",
      [params.email, params.password,params.group_id, params.is_active,params.created_at]
      );
      console.log('res',res);
    
      if (res.insertId > 0) {
         let data = {
           id:res.insertId
          
         }
      
          baseResponse.data = data;
          baseResponse.success = true;
      }else{
       
        baseResponse.data = {};
        baseResponse.success = true;

      }
  }catch(error){
      baseResponse.success = false;
      baseResponse.message = `service user.getUserbyEmailFromDB error : ${error}`;
      console.log(baseResponse.message);

  } finally {
      if (mysql) {
        await mysql.release();
    }
  }
  return baseResponse;
};
module.exports = result;
