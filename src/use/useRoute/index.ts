import {
  getCurrentInstance,
  type ExtractPropTypes,
  type ComponentPublicInstance,
  type PropType,
} from 'vue';
import {
  type RouteLocationRaw
} from 'vue-router';

export const routeProps = {
  to: [String, Object] as PropType<RouteLocationRaw>,
  url: String,
  replace: Boolean,
}

export type RouteProps = ExtractPropTypes<typeof routeProps>

// https://router.vuejs.org/zh/api/#to
export function route(
  {
    to,
    url,
    replace,
    $router: router,
  }: ComponentPublicInstance<RouteProps>
) {
  if (to && router) {
    router[replace ? 'replace' : 'push'](to);
  } else if (url) {
    replace ? location.replace(url) : (location.href = url);
  }
}

export function useRoute() {
  const vm = getCurrentInstance()!.proxy as ComponentPublicInstance<RouteProps>;
  return () => route(vm);
}
