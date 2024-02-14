/**
 * 通知数量模块
 */
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const { error } = require("../utils/log4j");
const utils = require("../utils/utils");

router.prefix("/leave");

router.get("/count", async (ctx) => {
  const data = 3;
  ctx.body = utils.success(data);
});

module.exports = router;
