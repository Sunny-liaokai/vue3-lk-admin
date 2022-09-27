import { request } from "@/util/request";

export function createUser(data: Partial<API.CreateUserParams>) {
  return request(
    {
      url: "sys/user/add",
      method: "post",
      data,
    },
    {
      successMsg: "创建用户成功",
    }
  );
}
