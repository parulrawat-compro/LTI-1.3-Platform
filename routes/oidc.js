var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {debugger
     res.send({ title: 'LTI 1.3 Platform' });
});

module.exports = router;
