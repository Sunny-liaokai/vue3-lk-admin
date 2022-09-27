import axios, { AxiosRequestConfig } from "axios";
import { message as $message } from "ant-design-vue";
import { Storage } from "@/util/Storage";
import { TOKEN_KEY } from "@/util/constant";

const UNKNOWN_ERROR = "未知错误，请重试";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
});

service.interceptors.request.use(
  (config) => {
    const token = Storage.get(TOKEN_KEY);
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  async (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      $message.error(res.message || UNKNOWN_ERROR);

      // Illegal token
      if (res.code === 401) {
        window.localStorage.clear();
        window.location.reload();
      }

      // throw other
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & {
        code: any;
      };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  (error) => {
    // 处理 400 或者 500 401 的错误异常提示
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    $message.error(errMsg);
    error.message = errMsg;
    return Promise.reject(error);
  }
);

export const request = async <T>(
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): Promise<T> => {
  try {
    const res = await service.request(config);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface RequestOptions {
  /** 当前接口权限, 不需要鉴权的接口请忽略， 格式：sys:user:add */
  permCode?: string;
  /** 是否直接获取data，而忽略message等 */
  isGetDataDirectly?: boolean;
  /** 请求成功是提示信息 */
  successMsg?: string;
  /** 请求失败是提示信息 */
  errorMsg?: string;
  /** 是否mock数据请求 */
  isMock?: boolean;
}

export type Response<T = any> = {
  code: number;
  message: string;
  data: T;
};

export type BaseResponse<T = any> = Promise<Response<T>>;
