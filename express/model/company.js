const mysqlConnector = require('../db/mysql-connector')
const baseResponse = require('../helpers/base-response.helper');
const result = {};
result.addshareholders = async function(params){

    let mysql = null;
    let base = {};
    try {
        mysql = await mysqlConnector.connection();
          //const data = await mysql.query("call sp_get_user_types()", []);
          const res = await mysql.rawquery("INSERT INTO company_shareholders (company_id,type_value,title,firstname,lastname,idcard,occupation,phone,idcardfile,legal_name,legal_number,legal_phone,legal_file,type_share,sharevalue,shareprice,sharepayment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            params.company_id,
            params.type_value,
            params.title,
            params.firstname,
            params.lastname,
            params.idcard,
            params.occupation,
            params.phone,
            params.idcardfile,
            params.legal_name,
            params.legal_number,
            params.legal_phone,
            params.legal_file,
            params.type_share,
            params.sharevalue,
            params.shareprice,
            params.sharepayment
          ]
          );
          
         
        
          if (res.insertId > 0) {
             let data = {
               id:res.insertId
              
             }
          
             base.data = data;
             base.success = true;
             
          }else{
           
              base.data = {};
              base.success = true;
              
    
          }
          console.log('base',base);
          return base;
      }catch(error){
          base.success = false;
          base.message = `service company.addshareholders error : ${error}`;
          return base;
         
    
      } finally {
          if (mysql) {
            await mysql.release();
        }
      }
}
result.addslegal = async function(params){
    

    let mysql = null;
    let base = {};
    try {
        mysql = await mysqlConnector.connection();
          //const data = await mysql.query("call sp_get_user_types()", []);
          const res = await mysql.rawquery("INSERT INTO company_legal_people (company_id,share_id,title,firstname,lastname) VALUES (?,?,?,?,?)",
          [
            params.company_id,
            params.share_id,
            params.title,
            params.firstname,
            params.lastname
            
          ]
          );
         
         
        
          if (res.insertId > 0) {
             let data = {
               id:res.insertId
              
             }
          
             base.data = data;
             base.success = true;
             
          }else{
           
              base.data = {};
              base.success = true;
              
    
          }
          
          return base;
      }catch(error){
        console.log('error',error);
          base.success = false;
          base.message = `service company.addslegal error : ${error}`;
          return base;
         
    
      } finally {
          if (mysql) {
            await mysql.release();
        }
      }
}
result.adddirector = async function(params){
    

    let mysql = null;
    let base = {};
    try {
        mysql = await mysqlConnector.connection();
          //const data = await mysql.query("call sp_get_user_types()", []);
          const res = await mysql.rawquery("INSERT INTO company_director (company_id,title,firstname,lastname,issign) VALUES (?,?,?,?,?)",
          [
            params.company_id,
            params.title,
            params.firstname,
            params.lastname,
            params.issign
          ]
          );
         
         
        
          if (res.insertId > 0) {
             let data = {
               id:res.insertId
              
             }
          
             base.data = data;
             base.success = true;
             
          }else{
           
              base.data = {};
              base.success = true;
              
    
          }
          
          return base;
      }catch(error){
        console.log('error',error);
          base.success = false;
          base.message = `service company.addfounders error : ${error}`;
          return base;
         
    
      } finally {
          if (mysql) {
            await mysql.release();
        }
      }
}
result.addfounders = async function(params){
    console.log('foud',params);

    let mysql = null;
    let base = {};
    try {
        mysql = await mysqlConnector.connection();
          //const data = await mysql.query("call sp_get_user_types()", []);
          const res = await mysql.rawquery("INSERT INTO company_founders (company_id,title,firstname,lastname,phone,idcard,isdirector) VALUES (?,?,?,?,?,?,?)",
          [
            params.company_id,
            params.title,
            params.firstname,
            params.lastname,
            params.phone,
            params.idcard,
           
            params.isdirector
          ]
          );
         
         
        
          if (res.insertId > 0) {
             let data = {
               id:res.insertId
              
             }
          
             base.data = data;
             base.success = true;
             
          }else{
           
              base.data = {};
              base.success = true;
              
    
          }
        
          return base;
      }catch(error){
        console.log('error',error);
          base.success = false;
          base.message = `service company.addfounders error : ${error}`;
          return base;
         
    
      } finally {
          if (mysql) {
            await mysql.release();
        }
      }
}
result.addMeeting = async function(params){
    console.log('foud',params);

    let mysql = null;
    let base = {};
    try {
        mysql = await mysqlConnector.connection();
          //const data = await mysql.query("call sp_get_user_types()", []);
          const res = await mysql.rawquery("INSERT INTO company_meeting (company_id,meeting_date,meeting_time,meeting_addess_no,meeting_building,meeting_level,meeting_room_no,meeting_soi,meeting_road,meeting_province,meeting_states,meeting_city,meeting_postcode,president_title,president_firstname,president_lastname,payment_detial,payment_price,payment_register,expenses,standard_rule,blling_day,blling_month,compensation,license_number,isauditor,auditor_title,auditor_firstname,auditor_lastname) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            params.company_id,
            params.meeting_date,
            params.meeting_time,
            params.meeting_addess_no,
            params.meeting_building,
            params.meeting_level,
            params.meeting_room_no,
            params.meeting_soi,
            params.meeting_road,
            params.meeting_province,
            params.meeting_states,
            params.meeting_city,
            params.meeting_postcode,
            params.president_title,
            params.president_firstname,
            params.president_lastname,
            params.payment_detial,
            params.payment_price,
            params.payment_register,
            params.expenses,
            params.standard_rule,
            params.blling_day,
            params.blling_month,
            params.compensation,
            params.license_number,
            params.isauditor,
            params.auditor_title,
            params.auditor_firstname,
            params.auditor_lastname
          ]
          );
         
         
        
          if (res.insertId > 0) {
             let data = {
               id:res.insertId
              
             }
          
             base.data = data;
             base.success = true;
             
          }else{
           
              base.data = {};
              base.success = true;
              
    
          }
         
          return base;
      }catch(error){
        console.log('error_meeting',error);
          base.success = false;
          base.message = `service company.addMeeting error : ${error}`;
          return base;
         
    
      } finally {
          if (mysql) {
            await mysql.release();
        }
      }
}
result.addCompany = async function(params){
    let mysql = null;
    let base = {};
  
  
    try {
      mysql = await mysqlConnector.connection();
        //const data = await mysql.query("call sp_get_user_types()", []);
        const res = await mysql.rawquery("INSERT INTO company (job_id, company_th, company_en, stamp, objective, objective_other,checked,addess_no,building,level,room_no,soi,road,province,states,city,postcode,copy_house,phone,email,map,amount_cap,share_value,share_total,ordinary_total,number_share_pre,payment_percent,isdirector,created_by,created_at,director_power,director_count,specify_director) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            params.job_id, 
            params.company_th, 
            params.company_en,
            params.stamp, 
            params.objective,
            params.objective_other,
            params.checked,
            params.addess_no,
            params.building,
            params.level,
            params.room_no,
            params.soi,
            params.road,
            params.province,
            params.states,
            params.city,
            params.postcode,
            params.copy_house,

            params.phone,
            params.email,
            params.map,
            params.amount_cap,
            params.share_value,
            params.share_total,
            params.ordinary_total,
            params.number_share_pre,
            params.payment_percent,
            params.isdirector,
            params.created_by,
            params.created_at,
            params.director_power,
            params.director_count,
            params.specify_director
        ]
        );
        
       
      
        if (res.insertId > 0) {
           let data = {
             id:res.insertId
            
           }
        
           base.data = data;
           base.success = true;
           
        }else{
         
            base.data = {};
            base.success = true;
            
  
        }
        console.log('base',base);
        return base;
    }catch(error){
        base.success = false;
        base.message = `service company.addCompany error : ${error}`;
        return base;
       
  
    } finally {
        if (mysql) {
          await mysql.release();
      }
    }
    
    
};
module.exports = result;

