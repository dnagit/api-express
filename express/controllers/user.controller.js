var express = require('express');
const baseResponse = require('../helpers/base-response.helper');
const usrModel = require('../model/usr');
var CryptoJS = require("crypto-js");
var crypto = require('crypto')
const { param } = require('../routes/api.route');
const result = {};
result.getUserPage = async (req, res) => {
    let mysql = null;
     baseResponse.success = false;
            baseResponse.responseCode = 501;
           
 
    try {
        const rsDetail = await usrModel.getTypesFromDB();
    
       
        if (rsDetail.data) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Data not found';
        } else {
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'Data not found';
        }
    } catch (error) {
        console.log(`service index error : ${error}`);
    } finally {
        if (mysql) {
            await mysql.release();
        }
    }
     res.send(baseResponse);
};
result.loginUser = async (req, res) => {
    let mysql = null;
    let params = req.body;
   
    //var password = CryptoJS.AES.encrypt(req.body.password, 'promp').toString();
    const password =  crypto.createHmac('sha256','prompt')
    .update(req.body.password)
    .digest('base64');
    params.password = password;
           
 
    try {
        const rsDetail = await usrModel.userLoginFromDB(params);
    
       
        if (rsDetail.success) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Success';
        } else {
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'User Or Password is worng';
        }
    } catch (error) {
        console.log(`service index error : ${error}`);
    } finally {
        if (mysql) {
            await mysql.release();
        }
    }
     res.send(baseResponse);
};

result.registerUser = async(req,res)=>{
    
    let params = req.body;
  
               
    const password =  crypto.createHmac('sha256','prompt')
    .update(req.body.password)
    .digest('base64');
    params.password = password;
    params.created_at = new Date();
   
    let mysql = null;
    try {
       
        //new Date();
        const rsDetail = await usrModel.getUserbyEmailFromDB(params.email);
    
        
        if (rsDetail.success) {
            const res = await usrModel.registerUerFromDB(params);
            console.log('res',res);
            if(res.data){
                baseResponse.data = res.data;
                baseResponse.success = true;
                baseResponse.responseCode = 200;
                baseResponse.message = 'Register Success';

            }else{
                baseResponse.data = {};
                baseResponse.success = false;
                baseResponse.responseCode = 501;
                baseResponse.message = 'Register error';

            }
           
        } else {
            baseResponse.data = {};
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'Email address already in use.';
        }
    } catch (error) {
        console.log(`service index error : ${error}`);
        baseResponse.data = {};
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = `service index error : ${error}`;
    } finally {
        if (mysql) {
            await mysql.release();
        }
    }
  
  
      res.send(baseResponse);
   // getUserbyEmailFromDB

}
//export default result;
module.exports = result;