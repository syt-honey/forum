import { createStore } from "vuex";

// 将 modules 中的文件添加到 module 中
const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modulesArray, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  // 兼容 import export 和 require module.export 两种规范
  modulesArray[moduleName] = value.default || value;
  return modulesArray;
}, {});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules
});
