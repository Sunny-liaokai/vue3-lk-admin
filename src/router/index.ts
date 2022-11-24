import { createRouter, createWebHistory } from "vue-router";
import { createRouterGuards } from "./router-guards";
import { whiteNameList } from "./constant";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/dashboard/welcome",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页"
    },
    children: []
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录"
    }
  }
];

export const router = createRouter({
  history: createWebHistory(""),
  routes
});

//加载路由
export async function setupRouter(app: App) {
  //创建路由守卫
  createRouterGuards(router, whiteNameList);
  //挂载路由
  app.use(router);

  //路由准备就绪后挂着App实例
  await router.isReady();
}

export default router;
