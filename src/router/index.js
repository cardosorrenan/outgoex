import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/expenses-list',
    name: 'expenses-list',
    meta: {
      title: 'Expenses List'
    },
    component: () => import('../views/ExpensesList.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - Outgoes'
  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
