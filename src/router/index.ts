import { mapTwoLevelRouter } from '@/utils'
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/layouts/Layout.vue')

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/index/home',
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: {
      noShowTabbar: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: (): any => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/index',
    component: Layout,
    name: 'Index',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard-outlined',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: '主控台',
          affix: true,
          cacheable: true,
          icon: 'MenuOutlined',
        },
      },
      {
        path: 'work-place',
        name: 'WorkPlace',
        component: (): any => import('@/views/index/work-place.vue'),
        meta: {
          title: '工作台',
          icon: 'MenuOutlined',
        },
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    meta: {
      title: '个人中心',
      isSingle: true,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'UserOutlined',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/exception/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    hidden: true,
    component: () => import('@/views/exception/500.vue'),
  },
  {
    path: '/403',
    name: '403',
    hidden: true,
    component: () => import('@/views/exception/403.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter(constantRoutes),
})

export default router
