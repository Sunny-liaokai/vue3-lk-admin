import { request } from "@/util/request";

/**
 * 获取用户的菜单和权限
 */
export function getPermissionsAndMenus() {
  return request<API.PermMenu>({
    url: "/account/permissionMenu",
    method: "get"
  });
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request<API.AdminUserInfo>({
    url: "/account/info",
    method: "get"
  });
}
