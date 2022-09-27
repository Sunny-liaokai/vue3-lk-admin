import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { Storage } from "@/util/Storage";
import { login } from "@/api/login";
import { TOKEN_KEY } from "@/util/constant";
import { getPermissionsAndMenus, getUserInfo } from "@/api/account";
import { dynamicAddRouter } from "@/router/dynamicRouter";

interface UserState {
  token: string;
  name: string;
  avatar: string;
  perms: string[];
  menus: RouteRecordRaw[];
  userinfo: Partial<API.AdminUserInfo>; // Partial变为可选
}

export const userUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    name: "root",
    avatar: "",
    perms: [],
    menus: [],
    userinfo: {}
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    }
  },
  actions: {
    /** 登录成功保存token */
    setToken(token: string) {
      this.token = token ?? "";
      // 7天
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(TOKEN_KEY, this.token, ex);
    },
    /** 登录 */
    async login(params: API.LoginParams) {
      try {
        const data = await login(params);
        this.setToken(data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      try {
        const [userInfo, { perms, menus }] = await Promise.all([getUserInfo(), getPermissionsAndMenus()]);
        this.userinfo = userInfo;
        this.perms = perms;
        this.avatar = userInfo.headImg;
        this.name = userInfo.name;
        //TODO 生成路由
        const routers = dynamicAddRouter(menus);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
});
