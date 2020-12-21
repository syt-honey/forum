"use strict";
const { env, curEnv } = require("./global");
const path = require("path");
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  devServer: {
    proxy: {
      "/api": {
        // 本地
        // target: "http://127.0.0.1:3000",
        // 开发库/正式库
        target: env[curEnv].proxy_url,
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, "./src/assets/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  }
};
