import axios from "axios";
import { TIMEOUT, URL_BASE } from "@/utils/constant";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  500: "服务器发生错误，请检查服务器。"
};

const axiosConfig = {
  success: config => {
    return config;
  },
  error: error => {
    console.error(error);
    return Promise.reject(error);
  }
};

const axiosResponse = {
  success: response => {
    responseLog(response);
    return checkStatus(response);
  },
  error: error => {
    console.error("responseErr：" + error);
    return Promise.reject(error);
  }
};

axios.interceptors.request.use(axiosConfig.success, axiosConfig.error);
axios.interceptors.response.use(axiosResponse.success, axiosResponse.error);

export default async function request(
  url,
  { method = "post", data = {}, headers = {}, dataType = "json" }
) {
  const formatHeaders = {
    "Content-Type": "application/json; charset=UTF-8",
    ...headers
  };

  const defaultConfig = {
    url: URL_BASE + url,
    method,
    params: data,
    data,
    timeout: TIMEOUT,
    headers: formatHeaders,
    responseType: dataType
  };
  if (method === "get") {
    defaultConfig.data = {};
  } else {
    defaultConfig.params = {};
  }
  return axios(defaultConfig);
}

function responseLog(response) {
  if (process.env.NODE_ENV === "development") {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`;
    console.log(
      "%c┍------------------------------------------------------------------┑",
      `color:${randomColor};`
    );
    console.log("| 请求地址：", response.config.url);
    console.log("| 请求参数：", JSON.stringify(response.config.data));
    console.log("| 返回数据：", response.data);
    console.log(
      "%c┕------------------------------------------------------------------┙",
      `color:${randomColor};`
    );
  }
}

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    }
    return {
      status,
      msg: codeMessage[status] || statusText
    };
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: "网络异常"
  };
}
