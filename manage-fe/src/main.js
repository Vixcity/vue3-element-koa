import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import request from "./utils/request";
import storage from "./utils/storage";

const app = createApp(App);

// 全局挂载
app.config.globalProperties.$api = request;
app.config.globalProperties.$storage = storage;

app.use(ElementPlus).use(router).mount("#app");
