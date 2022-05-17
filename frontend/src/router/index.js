import { createRouter, createWebHistory } from "vue-router";
import LoginFormView from "../views/LoginFormView.vue";
import SignUpFormView from "../views/SignUpFormView.vue";
import UserInfosView from "../views/UserInfosView.vue";
import WhatsNewView from "../views/WhatsNewView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginFormView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpFormView,
  },
  {
    path: "/userinfos",
    name: "userinfos",
    component: UserInfosView,
  },
  {
    path: "/whatsnew",
    name: "whatsnew",
    component: WhatsNewView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
