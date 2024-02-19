import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'auth',
    name: 'root'
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ]
  },
  {
    path: '/auth',
    redirect: 'auth/login',
    component: () => import(/* webpackChunkName: "authLayout" */ '@/layouts/auth/AuthLayout.vue'),
    children: [
      {
        path: 'registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "registration" */ '@/views/Registration.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = false;
//   if (!isAuthenticated && to.name !== 'Login') {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
