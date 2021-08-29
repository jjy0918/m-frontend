import Vue from "vue";
import store from "./store/index";
import { router } from "@/routes/index.js";
import App from "@/App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // ES6 문법 속성명과 속성값이 같은 이름이면 하나로 적을 수 있다.
  // 원래는 다음과 같다.
  // router: router,
  router,
  store,
}).$mount("#app");
