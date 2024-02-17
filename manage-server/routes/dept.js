/**
 * 部门列表
 */
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const { error } = require("../utils/log4j");
const utils = require("../utils/utils");

router.prefix("/dept");

router.get("/list", async (ctx) => {
  const data = [
    {
      parentId: [null],
      updateTime: "2024-02-17T19:20:50.37.418Z",
      createTime: "2024-02-17T19:20:50.37.418Z",
      _id: "60167059c9027b7d2c520a61",
      deptName: "研发部门",
      userId: "1000003",
      userName: "Vixcity",
      userEmail: "Vixcity@qq.com",
      __v: 0,
      children: [
        {
          parentId: ["60167059c9027b7d2c520a61", "6016728fc6a4417f2d27506e"],
          updateTime: "2024-02-17T19:20:50.37.418Z",
          createTime: "2024-02-17T19:20:50.37.418Z",
          _id: "60167059c9027b7d2c520a61",
          deptName: "java 小组-1",
          userId: "1000010",
          userName: "TIM",
          userEmail: "TIM@qq.com",
          __v: 0,
        },
      ],
    },
  ];
  ctx.body = utils.success(data);
});

module.exports = router;
