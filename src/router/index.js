import status from '@/router/status.js'
import tasks from '@/router/tasks.js'
import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/router/auth.js'
import HomeView from '@/views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/users/Profile.vue'
import notVerified from '@/views/layouts/notVerified.vue'
let routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/user/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/not-verified',
    component: notVerified,
  }
]
routes = routes.concat(auth)
routes = routes.concat(tasks)
routes = routes.concat(status)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
