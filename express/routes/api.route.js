var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
router.get('/users/v1/getgroups',  userController.getUserPage);
router.post('/users/v1/register',  userController.registerUser);
router.post('/users/v1/login',  userController.loginUser);


module.exports = router;