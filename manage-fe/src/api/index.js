/**
 * api 管理
 */

import request from "@/utils/request";
export default {
  login(data) {
    return request.post({
      url: "/users/login",
      data,
    });
  },
  noticeCount(data) {
    return request.get({
      url: "/leave/count",
      data,
    });
  },
  getMenuList(data) {
    return request.get({
      url: "/menu/list",
      data,
    });
  },
};
