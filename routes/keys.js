var express = require('express');
var router = express.Router();
var jwk_keys = require('../registered_data/jwk.json') 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(jwk_keys);
});

module.exports = router;
