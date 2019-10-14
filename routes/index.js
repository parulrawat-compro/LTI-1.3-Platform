var express = require('express');
var router = express.Router();
const registered_tool = require('../registered_data/tool.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LTI 1.3 Platform' });
});

module.exports = router;
