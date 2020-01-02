// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

const ScanRouter = require('./src/core/ScanRouter');

//解析原始request请求
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(async (ctx, next) => {
    console.log('koa app 1'); // 打印URL
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
    console.log('koa app 1 end'); // 打印URL
});

app.use(async (ctx, next) => {
    console.log('koa app 2'); // 打印URL
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
    console.log('koa app 2 end'); // 打印URL
});

//要在router.routes()之前
app.use(bodyParser());
app.use(ScanRouter());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
console.log('http://localhost:3000');