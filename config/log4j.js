const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            encoding: "utf-8",
            pattern: '-yyyy-MM-dd.log', //生成文件的规则
            filename: path.join('logs/', 'access.log') //生成文件名
        },
        application: {
            type: 'dateFile',
            encoding: "utf-8",
            pattern: '-yyyy-MM-dd.log',
            filename: path.join('logs/', 'application.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'DEBUG' },
        access: { appenders: ['access'], level: 'INFO' },
        application: { appenders: ['application'], level: 'WARN' }
    }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志
exports.logger = log4js.getLogger('application'); //记录所有应用级别的日志
exports.lg = log4js.getLogger('out'); //控制台