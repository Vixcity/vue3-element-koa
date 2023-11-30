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
      mock: true
    });
  },
  getMenuList(data) {
    return request.get({
      url: "/menu/list",
      data,
      mock: true
    });
  },
  getUserList(data) {
    return request.get({
      url: "/users/list",
      data,
      mock: true
    });
  },
};
