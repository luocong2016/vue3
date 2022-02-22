import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Modal } from 'ant-design-vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/user/Info.vue'),
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
    path: '/virtual-list',
    name: 'virtual-list',
    component: () => import('@/views/VirtualList.vue'),
  },
  {
    path: '/use/useRelation',
    name: '/use/useRelation',
    component: () => import('@/views/use/useRelation.vue'),
  },
  {
    path: '/use/useRect',
    name: '/use/useRect',
    component: () => import('@/views/use/useRect.vue'),
  },
  {
    path: '/use/useToggle',
    name: '/use/useToggle',
    component: () => import('@/views/use/useToggle.vue'),
  },
  {
    path: '/use/useScrollParent',
    name: '/use/useScrollParent',
    component: () => import('@/views/use/useScrollParent.vue'),
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
