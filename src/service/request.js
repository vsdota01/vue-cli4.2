/* eslint-disable no-console */
import axios from "axios";
const BASEURL = process.env.VUE_APP_URL;
const timeout = 30000;

export const create = con => {
  const ajax = axios.create({
    baseURL: BASEURL,
    timeout,
    ...con
  });
  // 添加请求拦截器
  ajax.interceptors.request.use(
    config => {
      console.log(config);
      // 在发送请求之前做些什么‘
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  ajax.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      switch (response.data.code) {
        case 200:
          return response.data.data;
        default:
          return Promise.reject(
            response.data.code + "_" + response.data.message
          );
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
  return ajax;
};

// window.onunhandledrejection = e => console.log(e.reason);

const request = create();

export default request;
