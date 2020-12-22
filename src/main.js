import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { componentMap } from "./components/global";
import service from "./utils/index";
import "./assets/style/index.less";
import "./assets/icons";
import { Message } from "@/components/global/ChMessage/index.js";
import { MessageBox } from "@/components/global/ChMessageBox/index.js";

import VueMarkdownEditor from "@kangc/v-md-editor";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";

VMdPreview.use(githubTheme);
VueMarkdownEditor.use(vuepressTheme);

const app = createApp(App);

// 将全局组件挂载到实例上
componentMap.forEach((value, key) => {
  app.component(key, value);
});

app.use(VueMarkdownEditor);
app.use(VMdPreview);

// 将请求服务挂载到实例上
app.config.globalProperties.$service = service;
app.config.globalProperties.$message = Message;
app.config.globalProperties.$messageBox = MessageBox;

app
  .use(store)
  .use(router)
  .mount("#app");
