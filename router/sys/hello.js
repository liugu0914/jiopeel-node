const router = require('koa-router')();

router.get('/hello/:name', async (ctx, next) => {
    await next();
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

module.exports = router;