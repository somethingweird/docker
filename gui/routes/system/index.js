var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/df', function(req, res, next) {
    // docker ps -a --format "{{.ID}}\t{{.Image}}\t{{.Command}}\t{{.CreatedAt}}\t{{.RunningFor}}\t{{.Ports}}\t{{.Status}}\t{{.Size}}\t{{.Names}}\t{{.Labels}}\t{{.Mounts}}\t{{.Networks}}" --no-trunc
    shell.execFile('docker', ['ps', '-a', '--format', '{{.ID}}\t{{.Image}}\t{{.Command}}\t{{.CreatedAt}}\t{{.RunningFor}}\t{{.Ports}}\t{{.Status}}\t{{.Size}}\t{{.Names}}\t{{.Labels}}\t{{.Mounts}}\t{{.Networks}}', '--no-trunc'], function (error, stdout, stderr) {

        var g = stdout.split("\n");
        var a = g.length - 1;
        var d = [];
        for (var i = 0; i < a; i++) {
            d.push(g[i].split("\t"));
        }
        res.json({images: d});
    });
});

router.get('/df/beta', function(req, res, next) {
    shell.execFile('docker', ['ps', '-a', '--format', '{{json .}}', '--no-trunc'], function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop();
        var j = rows.map(function (x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

module.exports = router;
