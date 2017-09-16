var express = require('express');
var router = express.Router();

var shell = require('child_process');

/* GET home page. */
router.get('/:tagId', function(req, res, next) {
    var regex = /^(\w+|sha256:\w+)$/;
    if (regex.test(req.params.tagId)) {
        var tagId = req.params.tagId;
        if (tagId.indexOf('sha256:') > 0) {
            tagId = tagId.splice(7);
        }
        shell.execFile('docker', ['rm', tagId], function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
                res.end();
            } else {
                res.json({success: true, message: stdout});
                res.end();
            }
        });
    } else {
        res.json({success: false});
        res.end();
    }
});

module.exports = router;
