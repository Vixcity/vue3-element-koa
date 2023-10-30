import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import request from "./utils/request";
import storage from "./utils/storage";
import api from "./api";

const app = createApp(App);

// 全局挂载
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;

app.provide("$request", request);
app.provide("$api", api);
app.provide("$storage", storage);

// 挂载 element-plus 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(router).use(store).mount("#app");
