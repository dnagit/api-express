var express = require('express');
const baseResponse = require('../helpers/base-response.helper');
const companyModel = require('../model/company');
const jobsModel = require('../model/jobs');
const result = {};
result.addCompany = async (req, res) => {
    
    let mysql = null;
    let params = req.body;
    
    params.created_by =  params.created_by? params.created_by:1;
    params.created_at = new Date();
   
    try {
        const res = await companyModel.addCompany(params);
       
        if(res.data){
            let company_id = res.data.id;
            params.company_id = company_id;
            await companyModel.addMeeting(params);
            if(params.shareholders){
                params.shareholders.map(async share=>{
                    share.company_id = company_id;
                    const shae = await companyModel.addshareholders(share);
                    let share_id = shae.data.id;
                   
                   
                    if(share.legal_people){
                        share.legal_people.map(async legal=>{
                            if(legal.title){
                                legal.company_id = company_id;
                                legal.share_id = share_id;
                                await companyModel.addslegal(legal);

                            }
                            
                            

                        });

                    }
                   
                    

                })

               // await Promise.all();

            }
            if(params.founders){
                params.founders.map(async founder=>{
                    
                    founder.company_id = company_id;
                   
                    await companyModel.addfounders(founder);
                    

                })

               // await Promise.all();

            }
            if(params.director){
                params.director.map(async director=>{
                    
                    director.company_id = company_id;
                   
                    await companyModel.adddirector(director);
                    

                })

               // await Promise.all();

            }
            let params_job = {
                id:params.job_id,
                action_id:2,
                status_id:2
            }
            await jobsModel.updateJobFromDB(params_job);
            
            baseResponse.data = res.data;
            baseResponse.success = true;
            baseResponse.responseCode = 200;
            baseResponse.message = 'Register Company Success';

        }else{
            baseResponse.data = {};
            baseResponse.success = false;
            baseResponse.responseCode = 501;
            baseResponse.message = 'Register Company error';

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
}

result.getMeeting = async (req, res) => {
    let mysql = null;
    let jobId = req.params.id
   
    //var password = CryptoJS.AES.encrypt(req.body.password, 'promp').toString();
  
 
    try {
        let resData=  await companyModel.getCompanyMeetingFromDB(jobId);
        //console.log('resData',resData.data);
       /* const taskAll = await Promise.all([
            jobsModel.getJobCountFromDB(uid,1),
            jobsModel.getJobCountFromDB(uid,2),
            jobsModel.getJobCountFromDB(uid,3),
            jobsModel.getJobCountFromDB(uid,4)
           
        ]);*/
         //console.log('taskAll',taskAll);
       /* baseResponse.data = {
            assignedcount: taskAll[0].data.count,
            pendingcount: taskAll[1].data.count,
            processingcount: taskAll[2].data.count,
            completecount: taskAll[3].data.count
          
           
        };*/
        if(resData.data){
            baseResponse.data = resData.data;

        }else{
            baseResponse.data = {}
        }
        
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
module.exports = result;