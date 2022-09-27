import { createRouter, createWebHashHistory } from "vue-router";
import { createRouterGuards } from "./router-guards";
import type { RouteRecordRaw } from "vue-router";

import type { App } from "vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Home/welcome",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    meta: { title: "首页" },
    children: []
  },
  {
    path: "/login",
    name: "LOGIN_NAME",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录"
    }
  }
];

export const router = createRouter({
  history: createWebHashHistory(""),
  routes
});

//加载路由
export async function setupRouter(app: App) {
  //创建路由守卫
  createRouterGuards(router);
  //挂载路由
  app.use(router);

  //路由准备就绪后挂着App实例
  await router.isReady();
}

export default router;
