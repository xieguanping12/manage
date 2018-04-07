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
        if (data) {
            res.render('admin/user/detail', {title: "用户详情", user: data})
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.get('/user/update', function (req, res) {
    _id = req.query._id;
    Users.findById(_id, function (err, data) {
        if (data) {
            res.render('admin/user/update', {title: "修改用户", user: data});
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.post('/user/update', function (req, res) {
    _id = req.body._id;
    Users.findById(_id, function (err, data) {
        if (data) {
            updateData = {
                name: req.body.name,
                passwd: req.body.passwd,
                email: req.body.email
            };
            Users.where({_id: _id}).update({$set: updateData}, function (err, data) {
                if (err) {
                    res.json({"code": -1, "status": "fail", "message": "更新失败"});
                } else {
                    res.json({"code": 0, "status": "ok", "message": "更新成功"});
                }
            });
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.post('/user/delete', function (req, res) {
    _id = req.body._id;
    Users.findById(_id).remove(function (err, data) {
        if (err) {
            res.json({"code": -1, "status": "fail", "message": "删除失败"})
        }
        res.json({"code": 0, "status": "ok", "message": "删除成功"});
    });
});

module.exports = router;