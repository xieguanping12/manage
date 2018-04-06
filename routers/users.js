//后台用户
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/users/index');
});

module.exports = router;