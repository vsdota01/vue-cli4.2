import Vue from "vue";
import VueRouter from "vue-router";
import coupon from "./coupon";
// import wk from "@/utils/wk.js";
// import Toast from "@/components/Toast";

Vue.use(VueRouter);

let routes = [];
routes.unshift(coupon);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
