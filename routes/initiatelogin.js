var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var toolParams = {
    toolId : req.query.toolId,
    resLinkId : req.query.resLinkId
  }

  var initiateLoginParams = {
    iss: 'https://lti-ri.imsglobal.org',
    client_id: 987654321,
    target_link_uri: 'https://secure-sea-62530.herokuapp.com/submit',
    login_hint: '9',
    lti_message_hint: '377'
  }

  res.render('form.jade', {
    title: 'Initiating OIDC login ',
    initiateLoginParams: initiateLoginParams,
    action: 'https://secure-sea-62530.herokuapp.com/oidc',
    method: 'POST'
  });

});

module.exports = router;
