const fs = require('fs');
const path = require('path');
const { lg } = require('./log4j');
//router 路径
const RouterDir = path.join(AppRoot, '/router');
/**
 * 扫描router目录下的所有路由
 */
var Controll = {
    init: function(dir) {
        let controllers_dir = dir || RouterDir,
            router = require('koa-router')();
        lg.info(`开始扫描 ${controllers_dir} 下路由文件`);
        Controll.addControllers(router, controllers_dir);
        lg.info("扫描路由文件完毕");
        return router.routes();
    },
    addControllers: function(router, dir) {
        let js_files = Controll.getFiles(dir);

        for (let f of js_files) {
            lg.info(`process controller: ${f}`);
            let route = require(f);

            router.use(route.routes());
            router.use(route.allowedMethods());
        }
    },
    getFiles: function name(dir) {
        let jsonFiles = [];
        this.handleFile(dir, jsonFiles);
        return jsonFiles;
    },
    handleFile: function(dir, jsonFiles) {
        let files = fs.readdirSync(dir);
        files.forEach(function(item, index) {
            let fPath = path.join(dir, item);
            let stat = fs.statSync(fPath);
            if (stat.isDirectory())
                Controll.handleFile(fPath, jsonFiles);

            if (stat.isFile() && item.endsWith('.js')) {
                jsonFiles.push(fPath);
            }
        });
    }
}

module.exports = Controll.init();