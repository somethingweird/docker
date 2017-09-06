var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    // docker images --format "{{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}"

    shell.execFile('docker', ['images', '--format', '{{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}'], function (error, stdout, stderr) {
        // REPOSITORY-TAG-IMAGE ID-CREATED-SIZE
        var rows = stdout.split("\n");
        var a = rows.length - 1;
        var d = [];
        for (var i = 0; i < a; i++) {
            // parse each one into it own cell
                d.push(rows[i].split("\t"));
        }
        res.json({images: d});
    });
});

// better way is now
router.get('/beta', function(req, res, next) {
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
