// 全局环境参数
const env = {
  // 开发库
  dev: {
    // 开发库中的生产环境，用于服务端 nginx 代理
    pro_base_url: "/dev",
    proxy_url: "http://121.196.109.76:3000"
  },
  // 正式库
  pro: {
    // 正式库中的生产环境，用于服务端 nginx 代理
    pro_base_url: "/pro",
    proxy_url: "http://121.196.109.76:3001"
  }
};

const curEnv = "dev";

module.exports = {
  env,
  curEnv
};
