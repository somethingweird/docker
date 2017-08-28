var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    shell.execFile('docker', ['images'], function (error, stdout, stderr) {
        var g = stdout.split("\n");
        var s = g.join('<br>');
        // REPOSITORY-TAG-IMAGE ID-CREATED-SIZE
        var a = g.length;
        var regex = /^(\S+)\s+(\S+)\s+(\S+)\s+(\d+\s\S+\s\S+)\s+(\S+)$/;
        for (var i = 0; i < a; i++) {
            // parse each one into it own cell
            console.log(regex.exec(g[i]));
        }
        res.render('index', { title: 'Express', out: s});
    });
});

module.exports = router;
