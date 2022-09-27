/**
 * 动态添加路由
 */
import { type RouteRecordRaw } from "vue-router";

export const dynamicAddRouter = (asyncMenus: API.Menu[]) => {
  console.log(asyncMenus);
  const routeList = filterAsyncRoute(asyncMenus);
  console.log(routeList);
};

/**
 * 递归生成菜单
 */
export function filterAsyncRoute(
  routes: API.Menu[],
  parentRoute: API.Menu | null = null,
  lastNamePath: string[] = []
): RouteRecordRaw[] {
  return routes
    .filter(route => route.type !== 2 && route.isShow && route.parentId == parentRoute?.id)
    .map(item => {
      const { router, viewPath, keepalive, name, orderNum, icon } = item;

      const route: Partial<RouteRecordRaw> = {
        path: "",
        name: "",
        meta: {
          orderNum,
          title: name,
          type: item.type,
          icon,
          perms: [],
          keepalive
        }
      };
      if (item.type === 0) {
        //如果是目录
        const children = filterAsyncRoute(routes, item);
        if (children?.length) {
          route.component = null;
          route.children = children;
        } else {
          route.component = null;
        }
        return route;
      } else if (item.type === 1) {//如果是页面
        route.component = null;
        const perms = routes.filter(n => n.parentId === item.id).flatMap(n => n.perms?.split(","));
        if (route.meta && perms) {
          route.meta.perms = "";
        }
        return route;
      }
      return undefined;
    }).filter((item): item is RouteRecordRaw => !!item);
}
