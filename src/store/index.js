import Vue from "vue";
import Vuex from "vuex";
import http from "@/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: {},
    loginUserId: null,
    allManager: null,
  },
  mutations: {
    saveTest: (state, payload) => {
      state.test = payload.data.managerLogList;
    },
    saveLoginUser: (state, payload) => {
      state.loginUserId = payload;
    },
    logout: (state) => {
      state.loginUserId = null;
    },
    saveAllManager: (state, payload) => {
      state.allManager = payload;
    }
  },
  actions: {
    userLogin(store, payload) {
      http
        .post(`/login`, payload)
        // 데이터 저장
        .then(function (response) {
          alert(response.data.data.name + "님 환영합니다");
          store.commit("saveLoginUser", response.data.data);
        })
        .catch((exp) => {
          alert("아이디 혹은 비밀번호를 확인해주세요");
          console.log(exp);
        });
    },
    getAllManager(store) {
      http
        .get(`/manager`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveAllManager", response.data);
        })
        .catch((exp) => console.log(`항목 불러오기 실패 : ${exp}`));

    },
  },
});
