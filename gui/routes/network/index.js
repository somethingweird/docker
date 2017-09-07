var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/ls', function(req, res, next) {
    // docker network ls --format "{{.ID}}\t{{.Name}}\t{{.Driver}}\t{{.Scope}}\t{{.Internal}}\t{{.Labels}}\t{{.CreatedAt}}"
    shell.execFile('docker', ['network', 'ls', '--format', '{{.ID}}\t{{.Name}}\t{{.Driver}}\t{{.Scope}}\t{{.Internal}}\t{{.Labels}}\t{{.CreatedAt}}'], function (error, stdout, stderr) {
        var g = stdout.split("\n");
        // DRIVER              VOLUME NAME
        var a = g.length - 1;
        var d = [];
        for (var i = 0; i < a; i++) {
            // parse each one into it own cell
                d.push(g[i].split("\t"));
        }
        res.json({images: d});
    });
});

router.get('/ls/beta', function(req, res, next) {
    shell.execFile('docker', ['network', 'ls', '--format', '{{json .}}', '--no-trunc'], function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop();
        var j = rows.map(function (x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

module.exports = router;
