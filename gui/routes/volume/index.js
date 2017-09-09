var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
/*
router.get('/ls', function(req, res, next) {
    // docker volume ls --format "{{.Driver}}\t{{.Name}}\t{{.Scope}}\t{{.Mountpoint}}\t{{.Labels}}"
    shell.execFile('docker', ['volume', 'ls', '--format', '{{.Driver}}\t{{.Name}}\t{{.Scope}}\t{{.Mountpoint}}\t{{.Labels}}'], function (error, stdout, stderr) {
        var g = stdout.split("\n");
        var a = g.length - 1;
        // DRIVER              VOLUME NAME
        var d = [];
        for (var i = 0; i < a; i++) {
            // parse each one into it own cell
            d.push(g[i].split("\t"));
        }
        res.json({images: d});
    });
});
*/

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
