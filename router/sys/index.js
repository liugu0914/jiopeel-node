var express = require('express');
var router = express.Router();
var request = require('request');
/* 登录页面 */
router.get('/', function(req, res, next) {
    res.render('core/login');
});


/* 登录操作 */
router.post('/login', function(req, res, next) {
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var data=req.body;
    console.log(data);
    request.post({ url: 'http://localhost:8088/login', formData:data }, function Callback(err, httpResponse, body) {
        if (err)
            return console.error('login error :',err);
            console.log(body);
        result = JSON.parse(body);
        res.json(result);
    });
});

/* 退出 */
router.get('/loginout', function(req, res, next) {
    request.get({ url: 'http://localhost:8088/loginout'}, function Callback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        // console.log('Upload successful!', body);
        result = JSON.parse(body);
        console.log(result);
        if(result.result)
            res.redirect('/');
    });
});


/* 注册 */
router.post('/register', function(req, res, next) {
    request.post({ url: 'http://localhost:8088/register', formData: postData }, function Callback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        // console.log('Upload successful!', body);
        result = JSON.parse(body);
        console.log(result);
        res.render('core/login', { title: 'Express', data: result.data });
    });
});


/* 主页面 */
router.get('/main', function(req, res, next) {
    res.render('core/admin/main');
});

module.exports = router;