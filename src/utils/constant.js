const { env, curEnv } = require("../../global");
// 超时时长
const TIMEOUT = 25000;
const URL_BASE =
  process.env.NODE_ENV === "production" ? env[curEnv].pro_base_url : "/api";

const RES_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  INNER_ERR: -2
};

module.exports = {
  TIMEOUT,
  URL_BASE,
  RES_CODE
};
