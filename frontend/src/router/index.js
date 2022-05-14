import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
