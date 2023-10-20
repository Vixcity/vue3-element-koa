import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import request from "./utils/request";

const app = createApp(App);

// 全局挂载
app.config.globalProperties.$api = request;

app.use(ElementPlus).use(router).mount("#app");
