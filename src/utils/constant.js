// 超时时长
const TIMEOUT = 25000;
const URL_BASE = process.env.NODE_ENV === "production" ? "" : "/api";

module.exports = {
  TIMEOUT,
  URL_BASE
};
