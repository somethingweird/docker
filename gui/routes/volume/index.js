var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/:command/:subcommand?', function(req, res, next) {
    var docker_params = [];
    var regex = /^(\w+|sha256:\w+)$/;
    switch(req.params['command']) {
        // docker images
        case 'rm':
            var tagID = req.params['subcommand'];
            if (regex.test(tagID)) {
                if (tagID.indexOf('sha256:') > 0) {
                    tagID = tagID.splice(7);
                };
                docker_params = ['volume', 'rm', tagID];
            };
            break;

    };
    if (docker_params.length > 0) {
        shell.execFile('docker', docker_params, function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
            } else {
                res.json({success: true, message: stdout});
            }
        });
    } else {
        console.log('no docker params, next()');
        next();
    }
});

module.exports = router;
