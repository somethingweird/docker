var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

module.exports = router;
