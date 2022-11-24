import { RouteRecordRaw } from "vue-router";
const RouterView = () => import("@/layout/routerView/index.vue");
const moduleName = "dashboard";
export const baseRouters: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: moduleName,
    redirect: "/dashboard/welcome",
    component: RouterView,
    children: [
      {
        path: "welcome",
        name: `${moduleName}-welcome`,
        meta: {
          title: "首页",
          icon: "icon-shouye"
        },
        component: () => import("@/views/dashboard/welcome.vue")
      }
    ]
  }
];
