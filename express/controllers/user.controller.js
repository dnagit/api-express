var express = require('express');
const baseResponse = require('../helpers/base-response.helper');
const result = {};
result.getUserPage = (req, res) => {
    baseResponse.data = {};
    baseResponse.message = 'done';
    baseResponse.success = true;
    baseResponse.responseCode = 200;
    res.send(baseResponse);
};
//export default result;
module.exports = result;