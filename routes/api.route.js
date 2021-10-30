var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
router.get('/users',  userController.getUserPage);
module.exports = router;