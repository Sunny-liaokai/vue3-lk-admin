/**
 * 路由警卫
 */
import NProgress from "nprogress";
import type { Router } from "vue-router";
import Storage from "@/util/Storage";
import { TOKEN_KEY } from "@/util/constant";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = "/dashboard/welcome";

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const token = Storage.get(TOKEN_KEY);

    if (token) {
      // 已经登陆且访问的是login页面
      if (to.name === "Login") {
        next({ path: defaultRoutePath });
        NProgress.done();
      } else {
      }
    } else {
    }
    next();
  });
}
