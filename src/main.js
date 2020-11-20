import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { componentMap } from "./components/global";
import "./assets/style/index.less";
import "./assets/icons";

const app = createApp(App);

// 将全局组件挂载到实例上
componentMap.forEach((value, key) => {
  app.component(key, value);
});

app
  .use(store)
  .use(router)
  .mount("#app");
