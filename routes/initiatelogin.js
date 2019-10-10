var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {debugger

  var toolParams = {
    toolId : req.query.toolId,
    resLinkId : req.query.resLinkId
  }
  console.log(toolParams)

  var initiateLoginParams = {
    iss: 'https://localhost:3000',
    client_id: 987654321,
    target_link_uri: 'https://lti-ri.imsglobal.org/lti/tools/537/login_initiations',
    login_hint: '9',
    lti_message_hint: '377'
  }

  res.render('form.jade', {
    title: 'Initiating OIDC login ',
    initiateLoginParams: initiateLoginParams,
    action: initiateLoginParams.target_link_uri,
    method: 'POST'
  });

});

module.exports = router;
