import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '/home',
        component: () => import('../views/home')
      },
      {
        path: '/users',
        name: '/users',
        component: () => import('../views/sysUsers')
      },
      {
        path: '/menus',
        name: '/menus',
        component: () => import('../views/sysMenus')
      },
      {
        path: '/roles',
        name: '/roles',
        component: () => import('../views/sysRoles')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
