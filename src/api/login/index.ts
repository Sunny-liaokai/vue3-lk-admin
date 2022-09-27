import { BaseResponse, request } from "@/util/request";

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function login(data: API.LoginParams) {
  return request<API.LoginResult>(
    {
      url: "login",
      method: "post",
      data,
    },
    {
      isGetDataDirectly: false,
    }
  );
}

/**
 * 获取验证码
 */

export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url: "captcha/img",
    method: "get",
    params,
  });
}
