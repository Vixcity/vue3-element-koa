const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const log4js = require("./utils/log4j");
const router = require("koa-router")();
const users = require("./routes/users");
const koajwt = require("koa-jwt");
const utils = require("./utils/utils");

// error handler
onerror(app);

require("./config/db");

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  log4js.info(
    `${JSON.stringify(ctx.request.url).split('"')[1]} => ${
      JSON.stringify(ctx.request.query) === "{}"
        ? JSON.stringify(ctx.request.body)
        : JSON.stringify(ctx.request.query)
    }`
  );
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 200
      ctx.body = utils.fail("Token 认证失败", utils.CODE.AUTH_ERROR);
    } else {
      throw err;
    }
  });
});

// routes
app.use(koajwt({ secret: "Vixcity" }).unless({
  path: [/^\/api\/users\/login/]
}));
router.prefix("/api");
router.use(users.routes(), users.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  log4js.error(`${err.stack}`);
});

module.exports = app;
