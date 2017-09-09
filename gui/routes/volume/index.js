var express = require('express');
var router = express.Router();

var shell = require('child_process');

router.get('/ls', function(req, res, next) {
    shell.execFile('docker', ['volume', 'ls', '--format', '{{json .}}'], function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop();
        console.log(rows);
        var j = rows.map(function(x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

module.exports = router;
