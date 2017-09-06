var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/:imageID', function(req, res, next) {
    var regex = /^\w+$/;
    if (regex.test(req.params.imageID)) {
        shell.execFile('docker', ['run', '-d', req.params.imageID], function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
            } else {
                res.json({success: true, message: stdout});
            }
        });
    } else {
        res.json({success: false});
    }
});

module.exports = router;
