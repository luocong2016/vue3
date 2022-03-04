import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { RouterView } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/pi',
    name: 'pi',
    component: () => import('@/views/Provide-inject.vue'),
  },
  {
    path: '/style-css',
    name: 'style-css',
    component: () => import('@/views/Style-css.vue'),
  },
  {
    path: '/effect',
    name: 'effect',
    component: () => import('@/views/Effect.vue'),
  },
  {
    path: '/use',
    redirect: '/use/useRelation',
    component: RouterView,
    children: [
      {
        path: 'useRelation',
        name: '/use/useRelation',
        component: () => import('@/views/use/useRelation.vue'),
      },
      {
        path: 'useRect',
        name: '/use/useRect',
        component: () => import('@/views/use/useRect.vue'),
      },
      {
        path: 'useToggle',
        name: '/use/useToggle',
        component: () => import('@/views/use/useToggle.vue'),
      },
      {
        path: 'useScrollParent',
        name: '/use/useScrollParent',
        component: () => import('@/views/use/useScrollParent.vue'),
      },
      {
        path: 'usePageVisibility',
        name: '/use/usePageVisibility',
        component: () => import('@/views/use/usePageVisibility.vue'),
      },
    ]
  },

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
