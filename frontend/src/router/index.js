import { createRouter, createWebHistory } from "vue-router";
import UserFormView from "../views/UserFormView.vue";
import UserInfosView from "../views/UserInfosView.vue";
import UsersView from "../views/UsersView.vue";
import WhatsNewView from "../views/WhatsNewView.vue";
import PostAndCommentsView from "../views/PostAndCommentsView.vue";
import SingleUserView from "../views/SingleUserView.vue";
import ErrorPageView from "../views/ErrorPageView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
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
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/userinfos",
    name: "userinfos",
    component: UserInfosView,
  },
  {
    path: "/users/:nickname",
    name: "user",
    component: SingleUserView,
  },
  {
    path: "/whatsnew",
    name: "whatsnew",
    component: WhatsNewView,
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostAndCommentsView,
  },
  {
    path: "/error",
    name: "error",
    component: ErrorPageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
