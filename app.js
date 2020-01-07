const Koa = require('koa');
const path = require('path');
const { lg, logger, accessLogger } = require('./config/log4j');
//http://aui.github.io/art-template/zh-cn/docs/syntax.html art-template语法
const render = require('koa-art-template');
const static = require('koa-static'); //静态资源服务插件

//解析原始request请求
const bodyParser = require('koa-bodyparser');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 根目录设置全局变量
global.AppRoot = path.resolve(__dirname);
global.API_core = "http://localhost:8088";
lg.info(`Using API_core as API url：${API_core}`);
lg.info(`Using AppRoot as root dir：${AppRoot}`);


//日志记录
app.use(accessLogger());

/**
 * 状态处理
 */
app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    let status = ctx.status;
    let res = { status: status };
    switch (status) {
        case 404:
            await ctx.render('error/error', res);
            logger.error(`[Uri : ${ctx.request.url}] [Method : ${ctx.request.method}] error on ${status}`);
            lg.error(`[Uri : ${ctx.request.url}] [Method : ${ctx.request.method}] error on ${status}`);
            break;
        case 200:
        default:
            lg.info(`[Uri : ${ctx.request.url}] [Method : ${ctx.request.method}] [Time : ${ms}ms]`); // 打印URL
            break;
    }
});

/**
 * 全局异常处理
 */
app.on("error", (err, ctx) => { //捕获异常记录错误日志
    lg.error(err);
    logger.error(err);
});

//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
});
// 配置静态资源，并设置缓存
app.use(static(path.join(__dirname, 'static'), {
    maxAge: 30 * 24 * 60 * 60 * 1000
}));
//要在router.routes()之前
app.use(bodyParser());
app.use(require('./config/controll'));

module.exports = app