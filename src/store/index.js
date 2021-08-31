import Vue from "vue";
import Vuex from "vuex";
import http from "@/http-common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: {},
  },
  mutations: {
    saveTest: (state, payload) => {
      state.test = payload.data.managerLogList;
    },
  },
  actions: {
    userLogin(store, payload) {
      http
        .post(`/manager`, payload)
        // 데이터 저장
        .then((response) => {
          if (response.data) {
            store.commit("setUserLogin", {
              loginName: response.data,
              loginId: payload.id,
            });
            alert(response.data + "님 환영합니다");
          } else {
            alert("아이디 혹은 비밀번호를 확인해주세요");
          }
        })
        .catch((exp) => console.log(`로그인 실패 : ${exp}`));
    },
    getAllManager(store) {
      console.log("dddd");
      http
        .get(`/managerlog`)
        // 데이터 저장
        .then((response) => {
          store.commit("saveTest", response.data);
        })
        .catch((exp) => console.log(`로그인 실패 : ${exp}`));
      console.log("dasdasdddd");

    },
  },
});
