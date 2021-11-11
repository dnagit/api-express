var express = require('express');
var axios = require('axios');
const baseResponse = require('../helpers/base-response.helper');
const jobsModel = require('../model/jobs');
const { param } = require('../routes/api.route');
const result = {};
result.getJobCount = async (req, res) => {
    let mysql = null;
    let uid = req.params.uid;
   
    //var password = CryptoJS.AES.encrypt(req.body.password, 'promp').toString();
    console.log(req.params);
           
 
    try {
        const taskAll = await Promise.all([
            jobsModel.getJobCountFromDB(uid,1),
            jobsModel.getJobCountFromDB(uid,2),
            jobsModel.getJobCountFromDB(uid,3),
            jobsModel.getJobCountFromDB(uid,4)
           
        ]);
         //console.log('taskAll',taskAll);
        baseResponse.data = {
            assignedcount: taskAll[0].data.count,
            pendingcount: taskAll[1].data.count,
            processingcount: taskAll[2].data.count,
            completecount: taskAll[3].data.count
          
           
        };
        baseResponse.success = true;
        baseResponse.responseCode = 200;
        baseResponse.message = 'Success';
    } catch (error) {
        console.log(`service index error : ${error}`);
    } finally {
        if (mysql) {
            await mysql.release();
        }
    }
     res.send(baseResponse);
};
result.createCharge = async (req,res)=>{
    var data = JSON.stringify({
        "card": req.body.card,
        "description": req.body.description,
        "amount": req.body.amount,
        "currency": "THB",
        "return_uri":req.body.return_uri,
        "capture": false
      });
      
      var config = {
        method: 'post',
        url: 'https://api.omise.co/charges',
        headers: { 
          'Authorization': 'Basic c2tleV90ZXN0XzVwczZ6NnUwaGFva3dkbzlnZGI=', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
     
      try{
        let response = await axios(config);
        if(response.data){
            let params = {
                job_id:req.body.job_id,
                charge_id:response.data.id,
                data:JSON.stringify(response.data)
            }
            let trans = await jobsModel.addTransactionFromDB(params);
        }

        baseResponse.data = response.data;
        baseResponse.success = true;
        baseResponse.responseCode = 200;
        baseResponse.message = 'TEst';
        //console.log(JSON.stringify(response.data));
      }catch(err){
        baseResponse.data ={};
        baseResponse.success = false;
        baseResponse.responseCode = 200;
        baseResponse.message = err;

      }
      res.send(baseResponse);
    

      

      
 

}
result.checkCharge = async (req,res)=>{
   /* var data = JSON.stringify({
        "card": req.body.card,
        "description": req.body.description,
        "amount": req.body.amount,
        "currency": "THB",
        "return_uri":req.body.return_uri,
        "capture": false
      });*/
      
      baseResponse.data = {};
     
      
     
      try{
        let tran= await jobsModel.getTransactionFromDB(req.params.job_id);
        
       // let response = await axios(config);
        if(tran.data){
            var config = {
                method: 'get',
                url: 'https://api.omise.co/charges/'+tran.data.charge_id,
                headers: { 
                  'Authorization': 'Basic c2tleV90ZXN0XzVwczZ6NnUwaGFva3dkbzlnZGI=', 
                  'Content-Type': 'application/json'
                },
              };
            let response = await axios(config);
            if(response.data){
                let params = {};
                params.id = req.params.job_id;

                if(response.data.status == 'successful' || response.data.status ==  'pending'){
                    params.status_id = 3;

                }else{
                    params.status_id = 2;

                }
                await jobsModel.updateJobFromDB(params);
                baseResponse.data = response.data;
            }
        }
       
      
        baseResponse.success = true;
        baseResponse.responseCode = 200;
        baseResponse.message = 'TEst';
        //console.log(JSON.stringify(response.data));
      }catch(err){
        baseResponse.data ={};
        baseResponse.success = false;
        baseResponse.responseCode = 200;
        baseResponse.message = err;

      }
      res.send(baseResponse);
    

      

      
 

}
result.getActions = async (req, res) => {
    let mysql = null;
   
   
    //var password = CryptoJS.AES.encrypt(req.body.password, 'promp').toString();
   
           
 
    try {
        const rsDetail = await jobsModel.getActionsFromDB();
    
       
        if (rsDetail.success) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Success';
        } else {
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'No Job ID';
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
result.getJob = async (req, res) => {
    let mysql = null;
    let id = req.params.id;
   
    //var password = CryptoJS.AES.encrypt(req.body.password, 'promp').toString();
   
           
 
    try {
        const rsDetail = await jobsModel.getJobFromDB(id);
    
       
        if (rsDetail.success) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Success';
        } else {
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'No Job ID';
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

result.getJobs = async(req,res)=>{
    let mysql = null;
    let params = req.body;
    
    try{
        const rsDetail = await jobsModel.getJobsFromDB(params);
    
       
        if (rsDetail.data) {
           
            
            baseResponse.data = rsDetail.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Done';
        } else {
            baseResponse.data = []
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'Data not found';
        }

    } catch (error) {
        console.log(`service index error : ${error}`);
        baseResponse.data = []
        baseResponse.success = false;
        baseResponse.responseCode = 501;
        baseResponse.message = 'Comming Soon';
    }
    
    res.send(baseResponse);

}

result.addJob = async (req, res) => {
    let params = req.body;
    let mysql = null;
    params.created_at = new Date();
    console.log('req',req.body);
    try {
        const res = await jobsModel.addJobFromDB(params);
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
    } catch (error) {
     
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
}
module.exports = result;