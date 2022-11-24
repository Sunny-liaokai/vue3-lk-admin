/**
 * 路由警卫
 */
import NProgress from "nprogress";
import { type WhiteNameList } from "./constant";
import type { Router } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import Storage from "@/util/Storage";
import { to as _to } from "@/util/awaitTo";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = "/dashboard/welcome";

export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
) {
  router.beforeEach(async (to, from, next) => {
    console.log(to);

    NProgress.start();
    const token = Storage.get(ACCESS_TOKEN_KEY);
    const userStore = useUserStore();
    if (token) {
      if (to.name === "Login") {
        next({ path: defaultRoutePath });
      } else {
        const hasRoute = router.hasRoute(to.name!);
        if (userStore.menus.length === 0) {
          // 从后台获取菜单
          const [err] = await _to(userStore.afterLogin());
          if (err) {
            userStore.resetToken();
            return next({ name: "Login" });
          }
          if (!hasRoute) {
            // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
            next({ ...to, replace: true });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } else {
      // not login
      if (whiteNameList.some((n) => n === to.name)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({
          name: "Login",
          query: { redirect: to.fullPath },
          replace: true
        });
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  });
  router.afterEach((to, from, failure) => {
    NProgress.done();
  });
}
