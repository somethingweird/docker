var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/:imageID', function(req, res, next) {
    var regex = /^(\w+|sha256:\w+)$/;
    if (regex.test(req.params.imageID)) {
        var imageID = req.params.imageID;
        if (imageID.indexOf('sha256:') > 0) {
            imageID = imageID.splice(7);
        };
        shell.execFile('docker', ['run', '-d', imageID], function (error, stdout, stderr) {
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

router.get('/:imageID/:networkID', function(req, res, next) {
    var regex = /^(\w+|sha256:\w+)$/;
    if (regex.test(req.params.imageID) && regex.test(req.params.networkID)) {
        var imageID = req.params.imageID;
        var networkID = req.params.networkID;
        if (imageID.indexOf('sha256:') > 0) {
            imageID = imageID.splice(7);
        };
        if (networkID.indexOf('sha256:') > 0) {
            networkID = networkID.splice(7);
        };
        shell.execFile('docker', ['run', '-d', '--network', networkID, imageID], function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
            } else {
                res.json({success: true, message: stdout});
            }
        });
    } else {
        res.json({success: false});
    };
});


module.exports = router;
