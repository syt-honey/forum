const componentMap = new Map();

// 加载 global 目录下的 .vue 文件
const componentContext = require.context("./", true, /\.vue$/);

componentContext.keys().forEach(component => {
  const componentConfig = componentContext(component);
  // 兼容 import export 和 require module.export 两种规范
  const ctrl = componentConfig.default || componentConfig;
  componentMap.set(ctrl.name, ctrl);
});

export { componentMap };
