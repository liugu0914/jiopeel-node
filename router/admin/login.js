const router = require('koa-router')();
const rp = require('request-promise');
const { lg } = require(`${AppRoot}/config/log4j`);


//本地登陆客户端id
const client_id = "2NJBuBGlG52PthBp";
//本地登陆客户端密钥
const client_secret = "GoN2CPwX5xfnn3mX3b4TcwbK9OuQPx7F";
//本地回调地址
const redirect_uri = "http://localhost:3000/oauth/redirect";
//授权地址
const Oauth_url = "http://localhost:8088/oauth/access_token";

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
   lg.info(`请求参数 : ${JSON.stringify(data)}`);
   //使用await使异步变同步
   await rp.post({
      uri: API_core + '/login',
      form: data
   }).then((body) => {
      lg.info("接口响应数据 :" + body);
      ctx.body = body; //返回接口数据
   }).catch((err) => {
      lg.error(`error on : ${err}`);
   }).finally(() => {
      ctx.body = ctx.body ? ctx.body : "";
   });
});


/**
 * 授权回调地址
 * 1.接受服务端授权登录的code
 * 2.通过code,client_id,client_secret访问Oauth_url获取token
 * 3.将token保存在本地
 * @author :lyc
 * @date   :2020-01-05 23:57:00
 */
router.get('/oauth/redirect', async (ctx, next) => {
   let data = ctx.query;
   lg.info(`请求参数 : ${JSON.stringify(data)}`);
   data.client_id = client_id;
   data.client_secret = client_secret;
   //使用await使异步变同步
   await rp.post({
      uri: Oauth_url,
      form: data
   }).then((body) => {
      lg.info("接口响应数据 :" + body);
      ctx.body = body; //返回接口数据
   }).catch((err) => {
      lg.error(`error on : ${err}`);
   }).finally(() => {
      ctx.body = ctx.body ? ctx.body : "";
   });
});


/**
 * 注册
 * @author :lyc
 * @date   :2020-1-6 16:00:28
 */
router.post('/register', async (ctx, next) => {
   let data = ctx.request.body;
   lg.info(`请求参数 : ${JSON.stringify(data)}`);
   //使用await使异步变同步
   await rp.post({
      uri: API_core + '/register',
      form: data
   }).then((body) => {
      lg.info("接口响应数据 :" + body);
      ctx.body = body; //返回接口数据
   }).catch((err) => {
      lg.error(`error on : ${err}`);
   }).finally(() => {
      ctx.body = ctx.body ? ctx.body : "";
   });
});


/**
 * 退出登录
 * @author :lyc
 * @date   :2020-1-6 16:00:28
 */
router.get('/loginout', async (ctx, next) => {
   let data = ctx.query;
   lg.info(`请求参数 : ${JSON.stringify(data)}`);
   //使用await使异步变同步
   await rp.get({
      uri: API_core + '/loginout',
      form: data
   }).then((body) => {
      lg.info("接口响应数据 :" + body);
      ctx.body = body; //返回接口数据
   }).catch((err) => {
      lg.error(`error on : ${err}`);
   }).finally(() => {
      ctx.body = ctx.body ? ctx.body : "";
   });
});

module.exports = router;