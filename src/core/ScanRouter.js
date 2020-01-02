const fs = require('fs');

function addMapping(router, mapping) {
    for (var mapper of mapping) {
        let method =(mapper.method || "").toUpperCase();
        let path=mapper.path;
        let func=mapper.func;
        if (method=='GET') {
            router.get(path, func);
            console.log(`register URL mapping: GET ${path}`);
        } else if (method=='POST') {
            router.post(path, func);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${path}`);
        }
    }
}

function addControllers(router,controllers_dir) {
    var files = fs.readdirSync(__dirname +`/../../`+ controllers_dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname +`/../../`+ controllers_dir+'/' + f);
        addMapping(router, mapping);
    }
}
module.exports = function (dir) {
    let controllers_dir = dir || '/src/router', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};