import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';
import Info from './views/Info.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/info',
    component: Info,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
