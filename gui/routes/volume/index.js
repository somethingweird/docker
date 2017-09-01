var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/ls', function(req, res, next) {
    shell.execFile('docker', ['volume', 'ls'], function (error, stdout, stderr) {
        var g = stdout.split("\n");
        var s = g.join('<br>');
        // DRIVER              VOLUME NAME
        var a = g.length;
        var regex = /^(\S+)\s+(\S+)$/;
        var d = [];
        for (var i = 0; i < a; i++) {
            // parse each one into it own cell
            var buffer = regex.exec(g[i]);
            if (buffer instanceof Array) {
                d.push(regex.exec(g[i]));
            }
        }
        res.json({images: d});
    });
});

module.exports = router;
