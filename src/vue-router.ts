import { RouterHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router'


export type RouterOptions = {
  history: RouterHistory,
  routers: RouteRecordRaw

  scrollBehavior?: RouterScrollBehavior,

  linkActiveClass?: string,
  linkExactActiveClass?: string,

  parseQuery?: (searchQuery: string) => Record<string, (string | null)[] | string | null>,
  stringifyQuery?: (query: Record<string | number, string | number | null | undefined | (string | number | null | undefined)[]>) => string
}