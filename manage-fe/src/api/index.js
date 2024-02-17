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
      mock: false,
    });
  },
  getMenuList(data) {
    return request.get({
      url: "/menu/list",
      data,
      mock: false,
    });
  },
  getUserList(data) {
    return request.get({
      url: "/users/list",
      data,
      mock: false,
    });
  },
  userDel(data) {
    return request.post({
      url: "/users/delete",
      data,
      mock: false,
    });
  },
  getRoleList(data) {
    return request.get({
      url: "/roles/allList",
      data,
      mock: false,
    });
  },
  getDeptList(data) {
    return request.get({
      url: "/dept/list",
      data,
      mock: false,
    });
  },
  userSubmit(data) {
    return request.post({
      url: "/users/operate",
      data,
      mock: false,
    });
  },
};
