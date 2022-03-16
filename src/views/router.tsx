
import { defineComponent, computed } from "vue";
import { type RouteRecord, type RouteRecordRaw, useRouter } from "vue-router";

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

const isUrl = (path: string): boolean => reg.test(path);

export type MenuData = {
  menuData: RouteRecordRaw[];
  breadcrumb: Record<string, RouteRecordRaw>;
}

const formatRelativePath = (routes: RouteRecordRaw[], breadcrumb: Record<string, RouteRecordRaw>, parent?: RouteRecordRaw): RouteRecordRaw[] => {
  // 计算路由绝对路径
  return routes.map((route) => {
    // startWith : http | https
    if (isUrl(route.path)) {
      return route
    }

    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    // @ref https://router.vuejs.org/guide/essentials/nested-routes.html#nested-routes
    const hasRelativePath = route.path.startsWith('/')
    if (!hasRelativePath) {
      if (parent) {
        route.path = `${parent.path || ''}/${route.path}`
      } else {
        route.path = `/${route.path}`
      }
    }

    // reformat path
    route.path = route.path.replace('//', '/')
    // format children routes
    if (route.children && route.children.length > 0) {
      route.children = formatRelativePath(route.children, breadcrumb, route)
    }
    breadcrumb[`${route.path}`] = route
    return route
  })
}

export function clearMenuItem(menusData: RouteRecord[] | RouteRecordRaw[]): RouteRecordRaw[] {
  return menusData
    .map((item: RouteRecord | RouteRecordRaw) => {
      const finalItem = { ...item }
      if (!finalItem.name || finalItem.meta?.hideInMenu) {
        return null
      }

      if (finalItem && finalItem?.children) {
        if (
          !finalItem.meta?.hideChildInMenu &&
          finalItem.children.some(
            (child: RouteRecord | RouteRecordRaw) => child && child.name && !child.meta?.hideInMenu
          )
        ) {
          return {
            ...item,
            children: clearMenuItem(finalItem.children),
          }
        }
        delete finalItem.children
      }
      return finalItem
    })
    .filter((item) => item) as RouteRecordRaw[]
}

export function getMenuData(routes: RouteRecordRaw[]): MenuData {
  const childrenRoute = routes.find((route) => route.path === '/');
  const breadcrumb: Record<string, RouteRecordRaw> = {};

  return {
    menuData: formatRelativePath(childrenRoute?.children || ([] as RouteRecordRaw[]), breadcrumb),
    breadcrumb
  }
}

export default defineComponent({
  setup() {
    // 路由信息
    const router = useRouter();

    // 获取路由菜单信息 | 可扩展函数
    const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));
    console.log(menuData);

    // 获取面包屑信息
    const breadcrumb = computed(
      () => router
        .currentRoute.value
        .matched
        .concat()
        .map(
          (item) => ({
            path: item.path,
            breadcrumbName: item.meta.title || ''
          })
        )
    );

    return () => <div>
      {JSON.stringify(breadcrumb.value)}
    </div>;
  },
});
