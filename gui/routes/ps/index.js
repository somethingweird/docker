var express = require('express');
var router = express.Router();

var shell = require('child_process');

router.get('/all', function(req, res, next) {
    shell.execFile('docker', ['ps', '-a', '--format', '{{json .}}', '--no-trunc'], function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop();
        var j = rows.map(function (x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

router.get('/', function (req, res, next) {
    res. json({success: true});
});
module.exports = router;
