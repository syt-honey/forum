// 超时时长
const TIMEOUT = 25000;
const URL_BASE = process.env.NODE_ENV === "production" ? "" : "/api";

const RES_CODE = {
  SUCCESS: 0,
  FAIL: -1
};

module.exports = {
  TIMEOUT,
  URL_BASE,
  RES_CODE
};
