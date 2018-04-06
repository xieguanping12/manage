//后台管理路由
let express = require('express');
let router = express.Router();

let Users = require('../models/Users');

router.get('/', function (req, res) {
    res.render('admin/index');
});
router.get('/user', function (req, res) {
    Users.find({}, function (err, data) {
        if (data.length>0) {
            res.render('admin/users/index',{title:"用户列表",users:data});
        } else  {
            res.json({"error":true,"message":"用户不存在"});
        }
    });
});

module.exports = router;