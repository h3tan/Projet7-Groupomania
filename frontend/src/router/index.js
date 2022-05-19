import { createRouter, createWebHistory } from "vue-router";
/* import LoginFormView from "../views/LoginFormView.vue";
import SignUpFormView from "../views/SignUpFormView.vue"; */
import UserFormView from "../views/UserFormView.vue";
import UserInfosView from "../views/UserInfosView.vue";
import WhatsNewView from "../views/WhatsNewView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
  /*   {
    path: "/login",
    name: "login",
    component: LoginFormView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpFormView,
  }, */
  {
    path: "/login",
    name: "login",
    component: UserFormView,
  },
  {
    path: "/signup",
    name: "signup",
    component: UserFormView,
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
