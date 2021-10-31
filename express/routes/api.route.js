var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const jobsController = require('../controllers/jobs.controller');
const companyController = require('../controllers/company.controller')
router.get('/users/v1/getgroups',  userController.getUserPage);
router.post('/users/v1/register',  userController.registerUser);
router.post('/users/v1/login',  userController.loginUser);
router.get('/jobs/v1/getJobCount/:uid',  jobsController.getJobCount);
router.post('/jobs/v1/addjob', jobsController.addJob);
router.post('/jobs/v1/getjobs',jobsController.getJobs);
router.get('/jobs/v1/get/:id',jobsController.getJob);
router.get('/jobs/v1/getactions', jobsController.getActions)
router.post('/company/v1/add', companyController.addCompany);

module.exports = router;