var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.get('/docker/:command/:subcommand?', function(req, res, next) {
    console.log(res.headersSent);
    console.log(req.params);
    var docker_params = [];
    switch(req.params['command']) {
        // docker images
        case 'images':
            docker_params = ['images', '--format', '{{json .}}', '--no-trunc'];
            break;

        // docker network ls
        case 'network':
            switch (req.params['subcommand']) {
                case 'ls':
                    docker_params = ['network', 'ls', '--format', '{{json .}}', '--no-trunc'];
                    break;
            };
            break;

        // docker ps -a
        case 'ps':
            switch (req.params['subcommand']) {
                case 'all':
                    docker_params = ['ps', '-a', '--format', '{{json .}}', '--no-trunc'];
                    break;
            };
            break;

        // docker system
        case 'system':
            switch (req.params['subcommand']) {
                case 'cpu':
                    docker_params = ['info', '--format', '{{.NCPU}}'];
                    break;
                case 'df':
                    docker_params = ['df', '--format', '{{json .}}'];
                    break;
                case 'info':
                    docker_params = ['system', 'info', '--format', '{{json .}}'];
                    break;
            };
            break;

        // docker volume ls
        case 'volume':
            switch (req.params['subcommand']) {
                case 'ls':
                    docker_params = ['volume', 'ls', '--format', '{{json .}}'];
                    break;
            }
            break;
    };
    if (docker_params.length > 0) {
        console.log('execute generic docker');
        shell.execFile('docker', docker_params, function (error, stdout, stderr) {
            var rows = stdout.split("\n");
            rows.pop();
            var j = rows.map(function (x) {
                return JSON.parse(x);
            });
            res.json({images: j});
        });
    } else {
        console.log('no docker params, next()');
        next();
    }
});

module.exports = router;
