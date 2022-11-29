import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/views/layout.vue'
// import Detail from '@/views/detail.vue'
// import Login from '@/views/login.vue'
// import Register from '@/views/register.vue'
// import Article from '@/views/article.vue'
// import Collect from '@/views/collect.vue'
// import Like from '@/views/like.vue'
// import User from '@/views/user.vue'
import { getToken } from '@/utils/localstory'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    redirect: '/article',
    children: [
      {
        path: '/article',
        component: () => import('@/views/article.vue')
      },
      {
        path: '/collect',
        component: () => import('@/views/like.vue')
      },
      {
        path: '/like',
        component: () => import('@/views/user.vue')
      },
      {
        path: '/user',
        component: () => import('@/views/layout.vue')
      }
    ]
  }, {
    path: '/detail/:id',
    component: () => import('@/views/detail.vue')
  }, {
    path: '/login',
    component: () => import('@/views/login.vue')
  }, {
    path: '/register',
    component: () => import('@/views/register.vue')
  }
]

const router = new VueRouter({
  routes
})
// 添加路由守卫
const pagelist = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (pagelist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
// 解决路由里面一个报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
