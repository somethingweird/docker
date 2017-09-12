var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/:tagId', function(req, res, next) {
    var regex = /^\w+$/;
    if (regex.test(req.params.tagId)) {
        shell.execFile('docker', ['rmi', req.params.tagId], function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
            } else {
                var matchAgainst = req.params.tagId;
                if (stdout.indexOf(matchAgainst) > -1) {
                    res.json({success: true, message: stdout});
                } else {
                    res.json({success: false, message: stdout});
                }
            }
        });
    } else {
        res.json({success: false});
    }
});

module.exports = router;
