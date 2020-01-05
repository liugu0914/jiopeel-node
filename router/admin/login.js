const router = require('koa-router')();
const rp = require('request-promise');
const { lg } = require(appRoot + '/config/log4j');


//本地登陆客户端id
const client_id = "2NJBuBGlG52PthBp";
//回调地址
const redirect_uri = "http://localhost:8088/oauth/redirect/local";

/**后台登录页面 */
router.get('/', async (ctx, next) => {
   let data = {
      client_id: client_id,
      redirect_uri: redirect_uri
   }
   await ctx.render('admin/login', data);
});

/**
 * 后台登录操作
 * @author :lyc
 * @date   :2020-01-05 23:57:00
 */
router.post('/login', async (ctx, next) => {
   let data = ctx.request.body;
   lg.info(`请求参数 : ${JSON.stringify(ctx.request.body)}`);
   //使用await使异步变同步
   await rp.post({
      uri: WebUrl + '/login',
      form: data
   }).then(function (body) {
      lg.info("接口响应数据 :" + body);
      ctx.body = body;//返回接口数据
   }).catch(function (err) {
      lg.error(`error on : ${err}`);
   });
});

module.exports = router;