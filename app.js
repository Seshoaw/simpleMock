// 导入koa模块
const Koa = require('koa');
const Router = require('koa-router');

const glob = require("glob");
const { resolve } = require('path');
const fs = require('fs');

const Mock = require('mockjs')

// 创建koa的实例app
const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

// 注册路由
glob.sync(resolve('./api', "**/*.json")).forEach((item, i) => {
  let apiJsonPath = item && item.split('/api')[1];
  let apiPath = apiJsonPath.replace('.json', '');

  router.get(apiPath, (ctx, next) => {
    try {
      let jsonStr = fs.readFileSync(item).toString();
      ctx.body = {
        data: Mock.mock(JSON.parse(jsonStr)),
      }
    } catch (err) {
      ctx.throw('服务器错误', 500);
    }
  });
});


app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
  console.log("mock服务已启动，http://localhost:3000");
})