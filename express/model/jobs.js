
const mysqlConnector = require('../db/mysql-connector')
const baseResponse = require('../helpers/base-response.helper');
const { param } = require('../routes/api.route');
const result = {};
result.getJobCountFromDB = async function(uid, status_id){
    let mysql = null;
    let where = 'created_by = '+uid;
    let base = {};
    try {
      mysql = await mysqlConnector.connection();
      where += ' and status_id = '+status_id;
     /* if(status_id == 1){
        where += ' and status_id in (1,2)';

      }else if(status_id){
        where += ' and status_id = '+status_id;

      }*/

        //const data = await mysql.query("call sp_get_user_types()", []);
        const data = await mysql.rawquery("SELECT COUNT(id) count FROM jobs WHERE "+where);
        console.log(where, data);
        base.data = data[0];
        base.success = true;
        
    }catch(error){
        base.success = false;
        base.message = `service jobs.getJobCountFromDB error : ${error}`;
     
  
    } finally {
        if (mysql) {
          await mysql.release();
      }
    }
    return base;
  
}
result.getActionsFromDB = async function(){

    let mysql = null;
    let base = {}
    try {
        mysql = await mysqlConnector.connection();
        
        const data = await mysql.rawquery("SELECT * FROM job_action");
        if (Array.isArray(data) && data.length > 0) {
        
            base.data = data;
            base.success = true;
        }else{
            base.data =[]

        }

    }catch(error){
        base.success = false;
        base.message = `service user.getTypesFromDB error : ${error}`;
        console.log(base.message);

    } finally {
        if (mysql) {
          await mysql.release();
        }
    }
    return base;
}
result.getJobFromDB = async function(id){
    let mysql = null;
    let base = {}
    try {
        mysql = await mysqlConnector.connection();
        let where = ' WHERE id='+id;
        const data = await mysql.rawquery("SELECT * FROM jobs"+where);
        if (Array.isArray(data) && data.length > 0) {
        
            base.data = data[0];
            base.success = true;
        }

    }catch(error){
        base.success = false;
        base.message = `service user.getTypesFromDB error : ${error}`;
        console.log(base.message);

    } finally {
        if (mysql) {
          await mysql.release();
        }
    }
    return base;
}
result.getJobsFromDB = async function(params){
    let mysql = null;
    let base = {}
    try {
        mysql = await mysqlConnector.connection();
        //const data = await mysql.query("call sp_get_user_types()", []);
        console.log('params',params);
        let limit = '';
        let where = ' WHERE created_by='+params.uid;
        if(params.status_id){
            where += ' and status_id = '+params.status_id;
        }
        
        if(params.perPage){
            limit = ' LIMIT '+params.offset+','+params.perPage;

        }

       
        const data = await mysql.rawquery("SELECT * FROM jobs"+where+limit);
        console.log(params.status_id,data);
       //console.log('data',data);
        if (Array.isArray(data) && data.length > 0) {
        
            base.data = data;
            base.success = true;
          }
    }catch(error){
        base.success = false;
        base.message = `service user.getTypesFromDB error : ${error}`;
        console.log(base.message);

    } finally {
        if (mysql) {
          await mysql.release();
        }
    }
    return base;
}
result.updateJobFromDB = async function(params){
    let mysql = null;
    console.log('params',params);
    let setjob = [];
    
    //setjob.push('updated_at = "'+new Date()+'"');
    if(params.action_id){
        setjob.push('action_id = '+params.action_id);

    }
    if(params.status_id){
        setjob.push('status_id = '+params.status_id);

    }
    console.log('setjob',setjob);
  
    try {
      mysql = await mysqlConnector.connection();
        //const data = await mysql.query("call sp_get_user_types()", []);
        const res = await mysql.rawquery("UPDATE jobs SET "+setjob.join(', ')+" WHERE id="+params.id);
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
result.addTransactionFromDB = async function(params){
    let mysql = null;
    let base = {};
    let update = [];
    try{
        mysql = await mysqlConnector.connection();
        const data = await mysql.rawquery("SELECT * FROM transaction WHERE job_id=?",[params.job_id]);
        if (Array.isArray(data) && data.length > 0) {
            let tran = data[0];
            ///update.push('job_id = '+params.job_id);
           // update.push('charge_id = "'+params.charge_id+'"');
           // update.push('data = "'+params.data+'"');
            console.log('update',update);
            await mysql.rawquery("UPDATE transaction SET job_id=?, charge_id=?,data=?  WHERE id=?",[params.job_id, params.charge_id, params.data,tran.id]);
        
           // base.data = data;
          
        }else{
            await mysql.rawquery("INSERT INTO transaction (job_id, charge_id, data) VALUES (?,?,?)",
             [params.job_id, params.charge_id, params.data]
        );
           // base.data =[]

        }
        base.data = res
        base.success = true;


    }catch(err){
        base.data = {}
        base.success = false;
        base.message = `service job.addTransactionFromDB error : ${err}`;
        console.log(base.message);
  

    }finally{
        if (mysql) {
            await mysql.release();
        }

    }
    return base;
}
result.getTransactionFromDB = async function(job_id){
    let mysql = null;
    let base = {}
    try{
        mysql = await mysqlConnector.connection();
        const data = await mysql.rawquery("SELECT * FROM transaction WHERE job_id=?",[job_id]);
       
        if (Array.isArray(data) && data.length > 0) {
            
            base.data = data[0];
            base.success = true;
           // base.data = data;
          
        }else{
            base.data = {};
        }
           // base.data =[]

       


    }catch(err){
        base.data = {}
        base.success = false;
        base.message = `service user.getTransactionFromDB error : ${err}`;
        console.log(base.message);
        

    }finally{
        if (mysql) {
            await mysql.release();
        }

    }
    return base;
}
result.addJobFromDB = async function(params){
    let mysql = null;
    console.log('params',params);
  
    try {
      mysql = await mysqlConnector.connection();
        //const data = await mysql.query("call sp_get_user_types()", []);
        const res = await mysql.rawquery("INSERT INTO jobs (job_name, price, status_id, action_id, created_by, created_at) VALUES (?,?,?,?,?,?)",
        [params.job_name, params.price, params.status_id,params.action_id, params.created_by,params.created_at]
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