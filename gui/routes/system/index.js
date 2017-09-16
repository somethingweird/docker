var express = require('express');
var router = express.Router();

var shell = require('child_process');
const os = require('os');


router.get('/:command', function (req, res, next) {
    switch(req.params['command']) {
        case 'cpu':
            docker_params = ['info', '--format', '{{.NCPU}}'];
            break;

        case 'df':
            docker_params = ['df', '--format', '{{json .}}'];
            break;

        case 'info':
            docker_params = ['system', 'info', '--format', '{{json .}}'];
            break;

        default:
            next();
    };
    shell.execFile('docker', docker_params, function (error, stdout, stderr) {
        var rows = stdout.split("\n");
        rows.pop();
        var j = rows.map(function (x) {
            return JSON.parse(x);
        });
        res.json({images: j});
    });
});

module.exports = router;
