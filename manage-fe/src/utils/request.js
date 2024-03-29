/**
 * axios 二次封装
 */

import axios from "axios";
import config from "@/config";
import { ElMessage } from "element-plus";
import router from "@/router";
import storage from "./storage";

const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_ERROR = "网络请求异常，请稍后重试";

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});

// 请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  const { token } = storage.getItem("userInfo");
  if (!headers.Authorization) headers.Authorization = "Bearer " + token;
  return req;
});

// 响应拦截
service.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data;

    if (code === 200) {
      return data;
    } else if (code === 50001) {
      ElMessage.error(TOKEN_INVALID);
      setTimeout(() => {
        router.push("./login");
      }, 1500);
      return Promise.reject(TOKEN_INVALID);
    } else {
      ElMessage.error(msg || NETWORK_ERROR);
      return Promise.reject(msg || NETWORK_ERROR);
    }
  },
  (err) => {
    if (err.response.status === 404) {
      ElMessage.error(NETWORK_ERROR);
      return Promise.reject(NETWORK_ERROR);
    } else {
      ElMessage.error(err || NETWORK_ERROR);
      return Promise.reject(err || NETWORK_ERROR);
    }
  }
);

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  if (typeof options.mock !== "undefined") {
    config.mock = options.mock;
  }

  if (config.env === "prop") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

["get", "post", "put", "delete", "patch"].forEach((item) => {
  request[item] = (info) => {
    return request({ ...info, method: item });
  };
});

export default request;
