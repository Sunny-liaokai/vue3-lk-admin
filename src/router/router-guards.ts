/**
 * 路由警卫
 */
import type { Router } from "vue-router";
import Storage from "@/util/Storage";
import { TOKEN_KEY } from "@/util/constant";

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = Storage.get(TOKEN_KEY);
    next();
  });
}
