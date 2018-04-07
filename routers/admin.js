//后台管理路由
let express = require('express');
let router = express.Router();

let Users = require('../models/Users');

router.get('/', function (req, res) {
    res.render('admin/index');
});
router.get('/user/list', function (req, res) {
    Users.find({}, function (err, data) {
        if (data.length > 0) {
            res.render('admin/user/index', {title: "用户列表", users: data});
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.get('/user', function (req, res) {
    Users.findById(req.query._id, function (err, data) {
        // console.log(req.query._id,data);
        if (data) {
            res.render('admin/user/detail', {title: "用户详情", user: data})
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

module.exports = router;