/**
 * 用户管理模块
 */
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { error } = require("../utils/log4j");
const utils = require("../utils/utils");

router.prefix("/users");

router.post("/login", async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    /**
     * 返回数据库指定的字段有三种方式
     * 1. 字符串 + 空格
     * "userId userName userEmail state role depId roleList"
     * 2. JSON => 1 代表返回，0 代表不返回
     * { userId: 1, _id: 0 }
     * 3. 通过 select 函数
     * User.findOne(
     *  {
     *    userName,
     *    userPwd,
     *  }
     * ).select('userId')
     */
    const res = await User.findOne(
      {
        userName,
        userPwd,
      },
      "userId userName userEmail state role depId roleList"
    );

    const data = res._doc;
    const token = jwt.sign({ data }, "Vixcity", { expiresIn: "1h" });

    if (res) {
      data.token = token;
      ctx.body = utils.success(data);
    } else {
      ctx.body = utils.fail("账号或密码不正确");
    }
  } catch {
    ctx.body = utils.fail(error.msg);
  }
});

module.exports = router;
