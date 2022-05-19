import { createRouter, createWebHistory } from "vue-router";
import UserFormView from "../views/UserFormView.vue";
import UserInfosView from "../views/UserInfosView.vue";
import WhatsNewView from "../views/WhatsNewView.vue";
import ShowPostView from "../views/ShowPostView.vue";
import WritePostView from "../views/WritePostView.vue";

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
    path: "/userinfos",
    name: "userinfos",
    component: UserInfosView,
  },
  {
    path: "/whatsnew",
    name: "whatsnew",
    component: WhatsNewView,
  },
  {
    path: "/post/:id",
    name: "post",
    component: ShowPostView,
  },
  {
    path: "/newpost",
    name: "newpost",
    component: WritePostView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
