import Vue from "vue";
import store from "./store/index";
import { router } from "@/routes/index.js";
import App from "@/App.vue";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // ES6 문법 속성명과 속성값이 같은 이름이면 하나로 적을 수 있다.
  // 원래는 다음과 같다.
  // router: router,
  router,
  store,
}).$mount("#app");
