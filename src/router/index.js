import { createRouter, createWebHistory } from "vue-router";
import { LOCAL_STORAGE_TOKEN_NAME } from "@/constants";

const routes = [
  {
    path: "/",
    redirect: "auth",
    name: "root",
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/default/Default.vue"),
    beforeEnter: (to, from, next) =>
      localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        ? next()
        : next({ name: "Auth" }),
    name: "Dashboard",
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "incomes",
        name: "Incomes",
        component: () =>
          import(/* webpackChunkName: "incomes" */ "@/views/Incomes.vue"),
      },
      {
        path: "expenses",
        name: "Expenses",
        component: () =>
          import(/* webpackChunkName: "expenses" */ "@/views/Expenses.vue"),
      },
      {
        path: "expense/:id",
        name: "Expense",
        component: () =>
          import(/* webpackChunkName: "expenses" */ "@/views/Expense.vue"),
      },
      {
        path: "goals",
        name: "Goals",
        component: () =>
          import(/* webpackChunkName: "goal" */ "@/views/Goal.vue"),
      },
      {
        path: "categories",
        name: "Categories",
        component: () =>
          import(/* webpackChunkName: "categories" */ "@/views/Categories.vue"),
      },
    ],
  },
  {
    path: "/auth",
    redirect: "auth/login",
    component: () =>
      import(
        /* webpackChunkName: "authLayout" */ "@/layouts/auth/AuthLayout.vue"
      ),
    name: "Auth",
    beforeEnter: (to, from, next) =>
      localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        ? next({ name: "Home" })
        : next(),
    children: [
      {
        path: "registration",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "registration" */ "@/views/Registration.vue"
          ),
      },
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
