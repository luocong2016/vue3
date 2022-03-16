import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { RouterView } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home', // 若无，菜单会被过滤
    redirect: '/home',
    meta: {
      title: 'Home',
      // hideInMenu: true, // 若true,当前会被过滤
      // hideChildInMenu: true, // 若true,当前children会被过滤
    },
    component: () => import('@/layouts'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: 'home', icon: 'SmileOutlined' },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'router',
        name: 'router',
        meta: { title: 'router', icon: 'SmileOutlined' },
        component: () => import('@/views/router')
      },
      {
        path: 'style-css',
        name: 'style-css',
        meta: { title: 'style-css', icon: 'SmileOutlined' },
        component: () => import('@/views/Style-css.vue'),
      },
      {
        path: 'effect',
        name: 'effect',
        meta: { title: 'effect', icon: 'SmileOutlined' },
        component: () => import('@/views/Effect.vue'),
      },
      {
        path: 'use',
        name: 'use',
        meta: {
          title: 'use',
          icon: 'SmileOutlined'
          // hideInMenu: true, // 若true,当前会被过滤
          // hideChildInMenu: true, // 若true,当前children会被过滤
        },
        redirect: '/use/useRelation',
        component: RouterView,
        children: [
          {
            path: 'useVisibility',
            name: 'useVisibility',
            meta: { title: 'useVisibility', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useVisibility.vue'),
          },
          {
            path: 'useRoute',
            name: 'useRoute',
            meta: { title: 'useRoute', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useRoute.vue'),
          },
          {
            path: 'usePlaceholder',
            name: 'usePlaceholder',
            meta: { title: 'usePlaceholder', icon: 'SmileOutlined' },
            component: () => import('@/views/use/usePlaceholder.vue'),
          },
          {
            path: 'useLazyRender',
            name: 'useLazyRender',
            meta: { title: 'useLazyRender', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useLazyRender.vue'),
          },
          {
            path: 'useRelation',
            name: 'useRelation',
            meta: { title: 'useRelation', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useRelation.vue'),
          },
          {
            path: 'useRect',
            name: 'useRect',
            meta: { title: 'useRect', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useRect.vue'),
          },
          {
            path: 'useToggle',
            name: 'useToggle',
            meta: { title: 'useToggle', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useToggle.vue'),
          },
          {
            path: 'useScrollParent',
            name: 'useScrollParent',
            meta: { title: 'useScrollParent', icon: 'SmileOutlined' },
            component: () => import('@/views/use/useScrollParent.vue'),
          },
          {
            path: 'usePageVisibility',
            name: 'usePageVisibility',
            meta: { title: 'usePageVisibility', icon: 'SmileOutlined' },
            component: () => import('@/views/use/usePageVisibility.vue'),
          },
        ]
      },
      {
        path: 'https://next.antdv.com/',
        name: 'antd_target',
        meta: { title: 'Ant Design Vue 官网', icon: 'link-outlined', target: '_blank' },
        component: () => null,
      },
    ]
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
  Modal.destroyAll();
  // message.destroy();
  next();
});

export default router;
