const router = require('koa-router')();

/**
 * 登陆成功跳转main
 * @author :lyc
 * @date   :2020-1-6 16:02:24
 */
router.post('/main', async(ctx, next) => {
    await ctx.render('admin/main', data);
});

module.exports = router;