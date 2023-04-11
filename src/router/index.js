import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AccountView from "../views/AccountView.vue";
import DrumsView from "../views/DrumsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/drums",
    name: "drums",
    component: DrumsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
