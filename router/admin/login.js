const router = require('koa-router')();

/**后台登录页面 */
router.get('/', async (ctx, next) => {
   await ctx.render('admin/login');
});

module.exports = router;