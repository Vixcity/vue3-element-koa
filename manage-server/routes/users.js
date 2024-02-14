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

router.get("/list", async (ctx) => {
  const data = {
    page: {
      pageNum: 1,
      pageSize: 10,
      total: 24,
    },
    list: [
      {
        state: 3,
        role: 1,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000002,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 1,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000003,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 0,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000004,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 0,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000005,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 0,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000006,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 3,
        role: 1,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000007,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 0,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000008,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 1,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000009,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 1,
        role: 1,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000010,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
      {
        state: 2,
        role: 0,
        roleList: [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc",
        ],
        deptId: ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
        userId: 1000011,
        userName: "admin",
        userEmail: "admin@imooc.com",
        createTime: "2021-01-17T13:32:06.381Z",
        lastLoginTime: "2021-01-17T13:32:06.381Z",
        __v: 0,
        job: "前端架构师",
        mobile: "17611020000",
      },
    ],
  };
  ctx.body = utils.success(data);
});

router.post("/delete", async (ctx) => {
  console.log(ctx)
  const data = {
    nModified: 1,
  };

  ctx.body = utils.success(data, "删除成功1条");
});

module.exports = router;
