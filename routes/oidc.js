var express = require('express');
var router = express.Router();
var handleOIDCQueryParam = require('../utility/handleoidcrequest')

/* GET users listing. */
router.get('/', function (req, res, next) {

    let queryParams = req.query;
    
    //handle the Query params received by Tool
    let initiateLoginParams = handleOIDCQueryParam.handleOIDCQueryParam(queryParams);

    return res.render('form.jade',{
        title: 'Sending launch request',
        initiateLoginParams: initiateLoginParams,
        action: initiateLoginParams.action,
        // id_token: initiateLoginParams.id_token,
        // state: initiateLoginParams.state,
        // action: initiateLoginParams.action,
        method: 'POST'
    });
});

module.exports = router;
