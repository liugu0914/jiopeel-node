// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const path = require('path');
const controll = require('./config/controll');
const { lg, logger, accessLogger } = require('./config/log4j');
const render = require('koa-art-template');
const static = require('koa-static'); //静态资源服务插件
//解析原始request请求
const bodyParser = require('koa-bodyparser');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

//日志记录
app.use(accessLogger());

app.use(async(ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    lg.info(`[Uri : ${ctx.request.url}] [Method : ${ctx.request.method}] [Time : ${ms}ms]`); // 打印URL
});

/**
 * 404处理
 */
app.use(async(ctx, next) => {
    await next(); // 调用下一个middleware
    let status = ctx.status;
    let res = { status: status };
    switch (status) {
        case 404:
            await ctx.render('error/error', res);
            break;
        default:
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
// 配置静态资源
const staticPath = './static'
app.use(static(
    path.join(__dirname, staticPath)
));
//要在router.routes()之前
app.use(bodyParser());
app.use(controll);
// 在端口3000监听:
app.listen(3000);
lg.info(`app started at port 3000...`);
lg.info(`http://localhost:3000`);