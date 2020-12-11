import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { componentMap } from "./components/global";
import service from "./utils/index";
import "./assets/style/index.less";
import "./assets/icons";
import { Message } from "@/components/global/ChMessage/index.js";

const app = createApp(App);

// 将全局组件挂载到实例上
componentMap.forEach((value, key) => {
  app.component(key, value);
});

// 将请求服务挂载到实例上
app.config.globalProperties.$service = service;
app.config.globalProperties.$message = Message;

app
  .use(store)
  .use(router)
  .mount("#app");
