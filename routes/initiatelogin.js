var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var toolParams = {
    toolId : req.query.toolId,
    resLinkId : req.query.resLinkId
  }

  var initiateLoginParams = {
    iss: 'https://lti-1-3-platform.herokuapp.com/',
    client_id: 987654321,
    target_link_uri: 'https://lti-ri.imsglobal.org/lti/tools/537/launches',
    login_hint: '9',
    lti_message_hint: '377'
  }

  res.render('form.jade', {
    title: 'Initiating OIDC login ',
    initiateLoginParams: initiateLoginParams,
    action: 'https://lti-ri.imsglobal.org/lti/tools/537/login_initiations',
    method: 'POST'
  });

});

module.exports = router;
