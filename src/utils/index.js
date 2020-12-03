import request from "./request";
import urls from "./api";

const service = {};

Object.keys(urls).forEach(key => {
  service[key] = (options = {}) => {
    return request(urls[key], options);
  };
});

export default service;
