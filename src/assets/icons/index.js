// 加载 svg 目录下的 .svg 文件
const req = require.context("./svg", false, /\.svg$/);
const reqAll = svgContext => {
  svgContext.keys().map(svgContext);
};
reqAll(req);
