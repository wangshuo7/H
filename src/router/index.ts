import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import { done, start } from '../utils/nprogress'
const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/login',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
      },
      // MarkDown 编辑器
      {
        path: '/markdown',
        name: 'MarkDown',
        component: () => import('@/views/MarkDown/index.vue')
      },
      // 富文本
      {
        path: '/rich',
        name: 'RichText',
        component: () => import('@/views/RichText/index.vue')
      },
      // 通知
      {
        path: '/toast',
        name: 'Toast',
        component: () => import('@/views/Toast/index.vue')
      },
      // 导出excel
      {
        path: '/excel',
        name: 'Excel',
        component: () => import('@/views/Excel/index.vue')
      },
      // 拖拽
      {
        path: '/drag',
        name: 'Drag',
        component: () => import('@/views/Drag/index.vue')
      },
      // Echarts
      {
        path: '/echarts',
        name: 'Echarts',
        component: () => import('@/views/Echarts/index.vue')
      },
      // 二维码
      {
        path: '/qrcode',
        name: 'Qrcode',
        component: () => import('@/views/Qrcode/index.vue')
      },
      // WebSocket
      {
        path: '/websocket',
        name: 'Websocket',
        component: () => import('@/views/Websocket/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (_pre, _next) => {
  start()
})
router.afterEach(() => {
  done()
})

export function useRouter() {
  return router
}

export function useRoute() {
  return router.currentRoute
}

export default router
