var express = require('express');
const baseResponse = require('../helpers/base-response.helper');
//const usrModel = require('../model/usr');
const result = {};
/*result.getUserPage = async (req, res) => {
    let mysql = null;
     baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'Data not found';
 
    try {
        const rsDetail = await usrModel.getTypesFromDB();
       
        if (rsDetail.data) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
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
};*/
result.getUserPage = async (req, res) => {
    baseResponse.data = {}
     baseResponse.success = true;
    baseResponse.responseCode = 200;
    baseResponse.message = 'Data not found';
 

     res.send(baseResponse);
};
//export default result;
module.exports = result;