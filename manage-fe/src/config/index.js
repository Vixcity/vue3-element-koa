/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/551b57f6703f630a704a42b8b3c76ffa/api",
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/551b57f6703f630a704a42b8b3c76ffa/api",
  },
  prod: {
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/551b57f6703f630a704a42b8b3c76ffa/api",
  },
};

export default {
  env: "dev",
  mock: false,
  namespace: "manager",
  ...EnvConfig[env],
};
