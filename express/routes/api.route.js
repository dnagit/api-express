var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
router.get('/users', userController.getUserPage);//ตรงนี้จะเรียกผ่านcontroller แทน
module.exports = router;