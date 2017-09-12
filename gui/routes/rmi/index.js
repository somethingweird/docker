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
        shell.execFile('docker', ['rmi', tagId], function (error, stdout, stderr) {
            if (stderr) {
                res.json({success: false, message: error});
            } else {
                res.json({success: false, message: stdout});
            }
        });
    } else {
        res.json({success: false});
    }
});

module.exports = router;
