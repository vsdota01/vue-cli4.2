import Vue from "vue";
import "@/assets/style/base.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/rem";
import wk from "./utils/wk";
import Toast from "./components/Toast/index";
Vue.prototype.$wk = wk;
Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
