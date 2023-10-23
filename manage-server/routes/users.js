/**
 * 用户管理模块
 */
const router = require("koa-router")();
const User = require("../models/userSchema");
const { error } = require("../utils/log4j");
const utils = require("../utils/utils");

router.prefix("/users");

router.post("/login", async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    const res = await User.findOne({
      userName,
      userPwd,
    });

    if (res) {
      ctx.body = utils.success(res);
    } else {
      ctx.body = utils.fail("账号或密码不正确");
    }
  } catch {
    ctx.body = utils.fail(error.msg);
  }
});

module.exports = router;
