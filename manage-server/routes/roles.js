/**
 * 角色列表
 */
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const { error } = require("../utils/log4j");
const utils = require("../utils/utils");

router.prefix("/roles");

router.get("/allList", async (ctx) => {
  const data = [
    {
      _id: "60150cb764de99631b2c3cd3",
      roleName: "产品经理",
    },
    {
      _id: "60180b07beaed6c45fbebdb",
      roleName: "研发",
    },
    {
      _id: "60180b59bleaed6c45fbebdc",
      roleName: "测试",
    },
    {
      _id: "60180b5ebleaed6c45fbebdd",
      roleName: "JAVA",
    },
    {
      _id: "60180b64bleaed6c45fbebde",
      roleName: "运维",
    },
    {
      _id: "60180b69bleaed6c45fbebdf",
      roleName: "运营",
    },
    {
      _id: "60180b76bleaed6c45fbebe0",
      roleName: "市场",
    },
    {
      _id: "60180b80bleaed6c45fbebe1",
      roleName: "管理层",
    },
  ];
  ctx.body = utils.success(data);
});

module.exports = router;
