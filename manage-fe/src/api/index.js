/**
 * api 管理
 */

import request from "../utils/request";
export default {
  login(data) {
    return request.post({
      url: "/users/login",
      data,
    });
  },
};
