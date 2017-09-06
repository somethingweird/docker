var express = require('express');
var router = express.Router();

var shell = require('child_process');

// better way is now
router.get('/', function(req, res, next) {
    // docker images --format '{{json .}}' --no-trunc
    shell.execFile('docker', ['images', '--format', '{{json .}}', '--no-trunc'], function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop(); // remove the last return line.
        var j = rows.map(function (x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

module.exports = router;
